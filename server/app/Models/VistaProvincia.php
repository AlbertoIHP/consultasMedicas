<?php

namespace App\Models;

use Eloquent as Model;

class VistaProvincia extends Model
{
    public function scopeFromView($query)
    {
        return $query->from('VistaProvincia');
    }
}