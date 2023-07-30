<?php

namespace App\ArticleSources;

use App\Interfaces\ArticleSourceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

abstract class ArticleSourceAbstarct implements ArticleSourceInterface
{

  protected array $article_list;
  protected string $url;

  protected $parser;
  protected $topic_model;
  protected $source_model;
  protected $article_model;

  public function __construct($url)
  {
    $this->url = $url;
    $this->article_list = [];
  }

  public function createQuery(array $params): array
  {
    return $params;
  }

  public function request(array $params): ArticleSourceAbstarct
  {
    $response = Http::get($this->url, $this->createQuery($params));
    if ($response->successful()) {
      $this->article_list = json_decode($response->getBody()->getContents(), true);
    } else {
      Log::error($response);
      exit(100);
    }
    return $this;
  }
  abstract public function format(array $article): array;
  abstract public function addArticles(array $params): void;

  public function setParser($parser){
    $this->parser = $parser;
  }
  public function setSourceModel(Model $model){
    $this->source_model = $model;
  }
  public function setTopicModel(Model $model){
    $this->topic_model = $model;
  }
  public function setArticleModel(Model $model){
    $this->article_model = $model;
  }
}
