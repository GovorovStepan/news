<?php

namespace App\Http\Controllers;

use App\Http\Requests\PreferencesSetRequest;
use App\Models\Preferences;
use Illuminate\Http\Request;

class PreferencesController extends Controller
{

  public function set(PreferencesSetRequest $request)
  {
    $user_id = $request->user()->id;
    $data = $request->validated();
    switch ($data['type']) {
      case 'topics':
        $params = ['user_id' => $user_id, 'topics_id' => json_encode($data['ids'])];
        break;
      case 'sources':
        $params = ['user_id' => $user_id, 'sources_id' => json_encode($data['ids'])];
        break;

      default:
        return response()->json(['error' => ['message' => ['Invalid type param.']]], 422);
    }

    Preferences::updateOrCreate(['user_id' => $user_id], $params);

    return response()->json([
      'result' => 'Data updated successfully',
    ]);
  }
  public function topics(Request $request)
  {
    $user_id = $request->user()->id;
    $preferences = Preferences::where('user_id', $user_id)->first();
    return response()->json($preferences ? json_decode($preferences->topics_id) : []);
  }
  public function sources(Request $request)
  {
    $user_id = $request->user()->id;
    $preferences = Preferences::where('user_id', $user_id)->first();
    return response()->json($preferences ? json_decode($preferences->sources_id) : []);
  }
}
