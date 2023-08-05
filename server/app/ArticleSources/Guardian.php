<?php

namespace App\ArticleSources;

use Exception;
use Illuminate\Support\Facades\Log;

class Guardian extends ArticleSourceAbstarct
{
  protected int $page = 1;
  public function format(array $article): array
  {
    $res = [
      'author' => 'The Guardian',
      'title' => $article['webTitle'],
      'text' => $this->parse_article_page($article['webUrl']),
      'source_id' => $this->source_model->firstOrCreate(['name' => 'The Guardian'])->id,
      'topic_id' => $this->topic_model->firstOrCreate(['name' => $article['pillarName'] ])->id,
      'publishedAt' => date('Y-m-d H:i:s', strtotime($article['webPublicationDate']))
    ];
    return $res;
  }
  public function addArticles(array $params): void
  {
    $this->request($params);
    foreach ($this->article_list['response']['results'] as $article) {
      try {
        $article_params = $this->format($article);
        $this->article_model->updateOrCreate(['title' => $article_params['title'], 'source_id' => $article_params['source_id']], $article_params);
      } catch (Exception $e) {
        Log::error($e->getMessage());
        continue;
      }
    }

    if ($this->article_list['response']['currentPage'] < $this->article_list['response']['pages']) {
      $this->page += 1;
      $this->addArticles($params);
    }
  }
  public function createQuery(array $params): array
  {
    $params['page'] = strval($this->page);
    $params['from-date'] = date('Y-m-d', strtotime('yesterday'));
    return $params;
  }

  protected function parse_article_page($url)
  {
    $text = '';
    $this->parser->loadFromUrl($url);
    $maincontent = $this->parser->find('div #maincontent p');
    foreach($maincontent as $p){
      $text .= strip_tags($p->innerHtml);
      $text .= ' \n\n ';
    }
    return htmlspecialchars_decode($text);
  }
}
