<?php

namespace App\Http\Controllers;

use App\Models\Source;

class SourcesController extends Controller
{
  public function list()
  {

    $sources = Source::all();

    return response()->json($sources);
  }
  
  public function get($id){
    $source = Source::where('id', $id)->first();
    return response()->json($source);
  }
}
