<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    
  protected $fillable = ['title', 'author', 'text', 'publishedAt', 'source_id', 'topic_id' ];

}
