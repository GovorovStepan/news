<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleFeedRequest;
use App\Http\Requests\ArticleSearchRequest;
use App\Models\Article;
use App\Models\Preferences;

class ArticlesController extends Controller
{

  protected function define_filters(Article $model, array $filters) 
  {

    foreach ($filters as $key => $filter) {
      switch ($key) {
        case 'topics':
          $model = $model->whereIn('topic_id', $filter);
          break;
        case 'sources':
          $model = $model->whereIn('source_id', $filter);
          break;
        case 'dates':
          $model = $model->whereBetween('publishedAt',  $filter);
          break;
        case 'keyword':
          $model = $model->where('text', 'like', "%{$filter}%");
          break;
      }}

      return $model;

  }

  public function get($id){
    $article = Article::where('id', $id)->first();
    return response()->json($article);
  }

  public function search(ArticleSearchRequest $request)
  {
    $data = $request->validated();
    $model = new Article();

    if (array_key_exists('filters', $data) and $data['filters']) {
      $model = $this->define_filters($model, $data['filters']);
    }


    $articles = $model->orderBy('id', 'asc')->paginate($data['pageSize'], ['*'], 'page', $data['page']);

    return response()->json($articles);
  }
  public function feed(ArticleFeedRequest $request)
  {
    $data = $request->validated();
    $user_id = $request->user()->id;
    $model = new Article();
    $preferences = json_decode(Preferences::where('user_id', $user_id)->first());
    $preferences_data = [];
    if($preferences){
      if($preferences->topics_id) $preferences_data['topics'] = json_decode($preferences->topics_id);
      if($preferences->sources_id) $preferences_data['sources'] = json_decode($preferences->sources_id);
    } 
    $model = $this->define_filters($model, $preferences_data);

    $articles = $model->orderBy('id', 'asc')->paginate($data['pageSize'], ['*'], 'page', $data['page']);

    return response()->json($articles);
  }
}
