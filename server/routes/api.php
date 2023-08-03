<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferencesController;
use App\Http\Controllers\SourcesController;
use App\Http\Controllers\TopicsController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/user', [AuthController::class, 'user']);

  Route::get('/sources', [SourcesController::class, 'list']);

  Route::get('/topics', [TopicsController::class, 'list']);


  // Route::get('/preferences', [PreferencesController::class, '']);
  Route::post('/preferences/set', [PreferencesController::class, 'set']);

  Route::get('/preferences/topics', [PreferencesController::class, 'topics']);

  Route::get('/preferences/sources', [PreferencesController::class, 'sources']);
});
