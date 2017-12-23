<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateFeriadoAPIRequest;
use App\Http\Requests\API\UpdateFeriadoAPIRequest;
use App\Models\Feriado;
use App\Repositories\FeriadoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class FeriadoController
 * @package App\Http\Controllers\API
 */

class FeriadoAPIController extends AppBaseController
{
    /** @var  FeriadoRepository */
    private $feriadoRepository;

    public function __construct(FeriadoRepository $feriadoRepo)
    {
        $this->feriadoRepository = $feriadoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/feriados",
     *      summary="Get a listing of the Feriados.",
     *      tags={"Feriado"},
     *      description="Get all Feriados",
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
     *                  @SWG\Items(ref="#/definitions/Feriado")
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
        $this->feriadoRepository->pushCriteria(new RequestCriteria($request));
        $this->feriadoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $feriados = $this->feriadoRepository->all();

        return $this->sendResponse($feriados->toArray(), 'Feriados retrieved successfully');
    }

    /**
     * @param CreateFeriadoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/feriados",
     *      summary="Store a newly created Feriado in storage",
     *      tags={"Feriado"},
     *      description="Store Feriado",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Feriado that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Feriado")
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
     *                  ref="#/definitions/Feriado"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateFeriadoAPIRequest $request)
    {
        $input = $request->all();

        $feriados = $this->feriadoRepository->create($input);

        return $this->sendResponse($feriados->toArray(), 'Feriado saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/feriados/{id}",
     *      summary="Display the specified Feriado",
     *      tags={"Feriado"},
     *      description="Get Feriado",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Feriado",
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
     *                  ref="#/definitions/Feriado"
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
        /** @var Feriado $feriado */
        $feriado = $this->feriadoRepository->findWithoutFail($id);

        if (empty($feriado)) {
            return $this->sendError('Feriado not found');
        }

        return $this->sendResponse($feriado->toArray(), 'Feriado retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateFeriadoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/feriados/{id}",
     *      summary="Update the specified Feriado in storage",
     *      tags={"Feriado"},
     *      description="Update Feriado",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Feriado",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Feriado that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Feriado")
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
     *                  ref="#/definitions/Feriado"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateFeriadoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Feriado $feriado */
        $feriado = $this->feriadoRepository->findWithoutFail($id);

        if (empty($feriado)) {
            return $this->sendError('Feriado not found');
        }

        $feriado = $this->feriadoRepository->update($input, $id);

        return $this->sendResponse($feriado->toArray(), 'Feriado updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/feriados/{id}",
     *      summary="Remove the specified Feriado from storage",
     *      tags={"Feriado"},
     *      description="Delete Feriado",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Feriado",
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
        /** @var Feriado $feriado */
        $feriado = $this->feriadoRepository->findWithoutFail($id);

        if (empty($feriado)) {
            return $this->sendError('Feriado not found');
        }

        $feriado->delete();

        return $this->sendResponse($id, 'Feriado deleted successfully');
    }
}
