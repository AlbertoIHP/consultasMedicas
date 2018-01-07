<?php

namespace App\Http\Controllers\API;

use App\Models\VistaBoxConsulta;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VistaBoxConsultaController
 * @package App\Http\Controllers\API
 */

class VistaBoxConsultaAPIController extends AppBaseController
{
    public function index(Request $request)
    {
        $vista = VistaBoxConsulta::fromView()->get();

        return $this->sendResponse($vista->toArray(), 'VistaBoxConsulta retrieved successfully');
    }

    public function show($id)
    {

        $vista = VistaBoxConsulta::fromView()->where('id', '=', $id)->get();

        return $this->sendResponse($vista->toArray(), 'VistaBoxConsulta retrieved successfully');
    }
}
