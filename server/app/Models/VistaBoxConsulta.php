<?php

namespace App\Models;

use Eloquent as Model;

class VistaBoxConsulta extends Model
{
     public function scopeFromView($query)
    {
        return $query->from('VistaBoxConsulta');
    }
}
