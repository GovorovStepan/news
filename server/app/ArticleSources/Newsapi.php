<?php

namespace App\ArticleSources;

class Newsapi extends ArticleSourceAbstarct
{
  public function format(array $article): array
  {
    return $article;
  }
  public function addArticles(array $params): void
  {
    $this->request($params);
    foreach ($this->article_list['response']['docs'] as $key => $article) {
      $params = $this->format($article);
      $this->article_model->updateOrCreate([], $params);
    }
  }

  public function createQuery(array $params): array
  {

    return $params;
  }

}
