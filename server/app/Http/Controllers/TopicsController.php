<?php

namespace App\Http\Controllers;

use App\Models\Topic;

class TopicsController extends Controller
{
    //
    public function list()
    {
  
      $topics = Topic::all();

      return response()->json($topics);
    }
}
