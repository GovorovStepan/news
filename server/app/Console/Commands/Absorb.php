<?php

namespace App\Console\Commands;

ini_set('memory_limit', '2048M');

use Illuminate\Console\Command;
use App\Factory\ArticleSourceFactory;
use App\Models\Article;
use App\Models\Source;
use App\Models\Topic;
use PHPHtmlParser\Dom;
use Exception;
use Illuminate\Support\Facades\Log;


class Absorb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:absorb';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Absorb data from APIs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sources = config('sources');
        foreach ($sources as $type => $data) {
          try{
            $source = ArticleSourceFactory::create($type, $data['url']);
            $source->setParser(new Dom);
            $source->setSourceModel(new Source());
            $source->setTopicModel(new Topic());
            $source->setArticleModel(new Article());
            $source->addArticles($data['params']);
          } catch(Exception $e){
            Log::error($e->getMessage());
            continue;
          }
        }

    }
}
