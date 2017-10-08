<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateEstadoCitaAPIRequest;
use App\Http\Requests\API\UpdateEstadoCitaAPIRequest;
use App\Models\EstadoCita;
use App\Repositories\EstadoCitaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class EstadoCitaController
 * @package App\Http\Controllers\API
 */

class EstadoCitaAPIController extends AppBaseController
{
    /** @var  EstadoCitaRepository */
    private $estadoCitaRepository;

    public function __construct(EstadoCitaRepository $estadoCitaRepo)
    {
        $this->estadoCitaRepository = $estadoCitaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/estadoCitas",
     *      summary="Get a listing of the EstadoCitas.",
     *      tags={"EstadoCita"},
     *      description="Get all EstadoCitas",
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
     *                  @SWG\Items(ref="#/definitions/EstadoCita")
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
        $this->estadoCitaRepository->pushCriteria(new RequestCriteria($request));
        $this->estadoCitaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $estadoCitas = $this->estadoCitaRepository->all();

        return $this->sendResponse($estadoCitas->toArray(), 'Estado Citas retrieved successfully');
    }

    /**
     * @param CreateEstadoCitaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/estadoCitas",
     *      summary="Store a newly created EstadoCita in storage",
     *      tags={"EstadoCita"},
     *      description="Store EstadoCita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EstadoCita that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EstadoCita")
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
     *                  ref="#/definitions/EstadoCita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateEstadoCitaAPIRequest $request)
    {
        $input = $request->all();

        $estadoCitas = $this->estadoCitaRepository->create($input);

        return $this->sendResponse($estadoCitas->toArray(), 'Estado Cita saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/estadoCitas/{id}",
     *      summary="Display the specified EstadoCita",
     *      tags={"EstadoCita"},
     *      description="Get EstadoCita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EstadoCita",
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
     *                  ref="#/definitions/EstadoCita"
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
        /** @var EstadoCita $estadoCita */
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            return $this->sendError('Estado Cita not found');
        }

        return $this->sendResponse($estadoCita->toArray(), 'Estado Cita retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateEstadoCitaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/estadoCitas/{id}",
     *      summary="Update the specified EstadoCita in storage",
     *      tags={"EstadoCita"},
     *      description="Update EstadoCita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EstadoCita",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EstadoCita that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EstadoCita")
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
     *                  ref="#/definitions/EstadoCita"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateEstadoCitaAPIRequest $request)
    {
        $input = $request->all();

        /** @var EstadoCita $estadoCita */
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            return $this->sendError('Estado Cita not found');
        }

        $estadoCita = $this->estadoCitaRepository->update($input, $id);

        return $this->sendResponse($estadoCita->toArray(), 'EstadoCita updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/estadoCitas/{id}",
     *      summary="Remove the specified EstadoCita from storage",
     *      tags={"EstadoCita"},
     *      description="Delete EstadoCita",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EstadoCita",
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
        /** @var EstadoCita $estadoCita */
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            return $this->sendError('Estado Cita not found');
        }

        $estadoCita->delete();

        return $this->sendResponse($id, 'Estado Cita deleted successfully');
    }
}
