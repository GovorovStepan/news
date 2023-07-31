<?php

namespace App\ArticleSources;

class Newsapi extends ArticleSourceAbstarct
{
  public function format(array $article): array
  {
    $parsed_page = $this->parse_article_page($article['url'], $article['source']['name'] );
    if($parsed_page){
      $res = [
        'author' => $article['author'],
        'title' => $article['title'],
        'text' => $parsed_page ,
        'source_id' => $this->source_model->firstOrCreate(['name' => $article['source']['name']])->id,
        'topic_id' => $this->topic_model->firstOrCreate(['name' => 'Economic'])->id,
        'publishedAt' => date('Y-m-d H:i:s', strtotime($article['publishedAt']))
      ];
    } else {
      $res = [];
    }
    return $res;
  }
  public function addArticles(array $params): void
  {
    $this->request($params);
    // dd($this->article_list['totalResults']);
    foreach ($this->article_list['articles'] as $key => $article) {
      $article_params = $this->format($article);
      var_dump($article_params );
      if(count($article_params) > 0){
        $this->article_model->updateOrCreate(['title' => $article_params['title'], 'source_id' => $article_params['source_id']], $article_params);
      } else {
        continue;
      }
    }
  }

  public function createQuery(array $params): array
  {
    $params['from'] = date('Y-m-d', strtotime('yesterday -1 day'));
    // var_dump($params);
    return $params;
  }

  protected function parse_article_page($url, $source)
  {
    $text = '';
    switch ($source) {
      case 'Cointelegraph':
        $this->parser->loadFromUrl($url);
        $content = $this->parser->find('article [class*="article"]')[0];
        $content = strip_tags($content->innerHtml , '<a>');
        break;
      
      case 'Zacks.com':
        $this->parser->loadFromUrl($url);
        $content = $this->parser->find('#comtext')[0];
        $content = strip_tags($content->innerHtml , '<a>');
        break;
      
      case 'Bitcoinist':
        $this->parser->loadFromUrl($url);
        $content = $this->parser->find('.content-inner')[0];
        $content = strip_tags($content->innerHtml , '<a>');
        break;
      case 'Forbes':
        $this->parser->loadFromUrl($url);
        $content = $this->parser->find('.article-body')[0];
        $content = strip_tags($content->innerHtml , '<a>');
        break;
      case 'Investing.com':
        $this->parser->loadFromUrl($url);
        $content = $this->parser->find('.articlePage')[0];
        $content = strip_tags($content->innerHtml , '<a>');
        break;

      case 'Business Insider':
        $this->parser->loadFromUrl($url);
        $contents = $this->parser->find('.content-lock-content p');
        $content = '';
        foreach ($contents as $el) {
          $content .=  strip_tags($el->innerHtml)  . PHP_EOL;
        }
        break;
  
      default:
        return false;
    }
    $text .= $content;


    return $text;

  }

}
