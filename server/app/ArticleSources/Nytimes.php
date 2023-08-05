<?php

namespace App\ArticleSources;

use Exception;
use Illuminate\Support\Facades\Log;

class Nytimes extends ArticleSourceAbstarct
{

  protected int $page = 1;
  public function format(array $article): array
  {
    $res = [
      'author' => $article['byline']['original'],
      'title' => $article['headline']['main'],
      'text' => $this->parse_article_page($article['web_url']),
      'source_id' => $this->source_model->firstOrCreate(['name' => 'NewYorkTimes'])->id,
      'topic_id' => $this->topic_model->firstOrCreate(['name' => $article['news_desk']])->id,
      'publishedAt' => date('Y-m-d H:i:s', strtotime($article['pub_date']))
    ];
    return $res;
  }

  public function addArticles(array $params): void
  {
    $this->request($params);

    foreach ($this->article_list['response']['docs'] as $article) {
      try{
        $article_params = $this->format($article);
        $this->article_model->updateOrCreate(['title' => $article_params['title'], 'source_id' => $article_params['source_id']], $article_params);
      } catch(Exception $e){
        Log::error($e->getMessage());
        continue;
      }
    }

    if($this->article_list['response']['meta']['offset'] < $this->article_list['response']['meta']['hits']){
      $this->page += 1;
      $this->addArticles($params);
    }
  }
  public function createQuery(array $params): array
  {

    $params['begin_date'] = date('Ymd', strtotime('yesterday')); 
    $params['page'] = strval($this->page);
    return $params;
  }

  protected function parse_article_page($url)
  {
    $text = '';
    $this->parser->loadFromUrl($url);
    $maincontent = $this->parser->find('section[name="articleBody"] p');
    foreach($maincontent as $p){
      $text .= strip_tags($p->innerHtml);
      $text .= ' \n\n ';
    }
    return htmlspecialchars_decode($text);
  }
}
