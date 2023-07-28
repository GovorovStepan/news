<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        $this->line('==================');

    }
}
