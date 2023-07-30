<?php

namespace App\Interfaces;

interface ArticleSourceInterface {
  public function createQuery(array $params):array;
  public function request(array $params): ArticleSourceInterface;
  public function format(array $article) : array;
  public function addArticles(array $params) : void;
}
