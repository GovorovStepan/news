<?php

namespace App\Factory;
use App\ArticleSources\ArticleSourceAbstarct;
use App\ArticleSources\Guardian;
use App\ArticleSources\Newsapi;
use App\ArticleSources\Nytimes;

class ArticleSourceFactory {
  public static function create($type, $url) : ArticleSourceAbstarct {
      switch ($type) {
          case 'newsapi': return new Newsapi($url);
          case 'guardian': return new Guardian($url);
          case 'nytimes': return new Nytimes($url);
          default:
              throw new \Exception('Wrong ArticleSource type passed.');
      }
  }
}