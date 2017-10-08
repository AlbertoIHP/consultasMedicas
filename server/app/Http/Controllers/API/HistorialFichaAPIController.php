<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateHistorialFichaAPIRequest;
use App\Http\Requests\API\UpdateHistorialFichaAPIRequest;
use App\Models\HistorialFicha;
use App\Repositories\HistorialFichaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class HistorialFichaController
 * @package App\Http\Controllers\API
 */

class HistorialFichaAPIController extends AppBaseController
{
    /** @var  HistorialFichaRepository */
    private $historialFichaRepository;

    public function __construct(HistorialFichaRepository $historialFichaRepo)
    {
        $this->historialFichaRepository = $historialFichaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/historialFichas",
     *      summary="Get a listing of the HistorialFichas.",
     *      tags={"HistorialFicha"},
     *      description="Get all HistorialFichas",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/HistorialFicha")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->historialFichaRepository->pushCriteria(new RequestCriteria($request));
        $this->historialFichaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $historialFichas = $this->historialFichaRepository->all();

        return $this->sendResponse($historialFichas->toArray(), 'Historial Fichas retrieved successfully');
    }

    /**
     * @param CreateHistorialFichaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/historialFichas",
     *      summary="Store a newly created HistorialFicha in storage",
     *      tags={"HistorialFicha"},
     *      description="Store HistorialFicha",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HistorialFicha that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HistorialFicha")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/HistorialFicha"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateHistorialFichaAPIRequest $request)
    {
        $input = $request->all();

        $historialFichas = $this->historialFichaRepository->create($input);

        return $this->sendResponse($historialFichas->toArray(), 'Historial Ficha saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/historialFichas/{id}",
     *      summary="Display the specified HistorialFicha",
     *      tags={"HistorialFicha"},
     *      description="Get HistorialFicha",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HistorialFicha",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/HistorialFicha"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var HistorialFicha $historialFicha */
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            return $this->sendError('Historial Ficha not found');
        }

        return $this->sendResponse($historialFicha->toArray(), 'Historial Ficha retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateHistorialFichaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/historialFichas/{id}",
     *      summary="Update the specified HistorialFicha in storage",
     *      tags={"HistorialFicha"},
     *      description="Update HistorialFicha",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HistorialFicha",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="HistorialFicha that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/HistorialFicha")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/HistorialFicha"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateHistorialFichaAPIRequest $request)
    {
        $input = $request->all();

        /** @var HistorialFicha $historialFicha */
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            return $this->sendError('Historial Ficha not found');
        }

        $historialFicha = $this->historialFichaRepository->update($input, $id);

        return $this->sendResponse($historialFicha->toArray(), 'HistorialFicha updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/historialFichas/{id}",
     *      summary="Remove the specified HistorialFicha from storage",
     *      tags={"HistorialFicha"},
     *      description="Delete HistorialFicha",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of HistorialFicha",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var HistorialFicha $historialFicha */
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            return $this->sendError('Historial Ficha not found');
        }

        $historialFicha->delete();

        return $this->sendResponse($id, 'Historial Ficha deleted successfully');
    }
}
