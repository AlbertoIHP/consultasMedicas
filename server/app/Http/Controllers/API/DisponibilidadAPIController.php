<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateDisponibilidadAPIRequest;
use App\Http\Requests\API\UpdateDisponibilidadAPIRequest;
use App\Models\Disponibilidad;
use App\Repositories\DisponibilidadRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class DisponibilidadController
 * @package App\Http\Controllers\API
 */

class DisponibilidadAPIController extends AppBaseController
{
    /** @var  DisponibilidadRepository */
    private $disponibilidadRepository;

    public function __construct(DisponibilidadRepository $disponibilidadRepo)
    {
        $this->disponibilidadRepository = $disponibilidadRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/disponibilidads",
     *      summary="Get a listing of the Disponibilidads.",
     *      tags={"Disponibilidad"},
     *      description="Get all Disponibilidads",
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
     *                  @SWG\Items(ref="#/definitions/Disponibilidad")
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
        $this->disponibilidadRepository->pushCriteria(new RequestCriteria($request));
        $this->disponibilidadRepository->pushCriteria(new LimitOffsetCriteria($request));
        $disponibilidads = $this->disponibilidadRepository->all();

        return $this->sendResponse($disponibilidads->toArray(), 'Disponibilidads retrieved successfully');
    }

    /**
     * @param CreateDisponibilidadAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/disponibilidads",
     *      summary="Store a newly created Disponibilidad in storage",
     *      tags={"Disponibilidad"},
     *      description="Store Disponibilidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Disponibilidad that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Disponibilidad")
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
     *                  ref="#/definitions/Disponibilidad"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateDisponibilidadAPIRequest $request)
    {
        $input = $request->all();

        $disponibilidads = $this->disponibilidadRepository->create($input);

        return $this->sendResponse($disponibilidads->toArray(), 'Disponibilidad saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/disponibilidads/{id}",
     *      summary="Display the specified Disponibilidad",
     *      tags={"Disponibilidad"},
     *      description="Get Disponibilidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Disponibilidad",
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
     *                  ref="#/definitions/Disponibilidad"
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
        /** @var Disponibilidad $disponibilidad */
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            return $this->sendError('Disponibilidad not found');
        }

        return $this->sendResponse($disponibilidad->toArray(), 'Disponibilidad retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateDisponibilidadAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/disponibilidads/{id}",
     *      summary="Update the specified Disponibilidad in storage",
     *      tags={"Disponibilidad"},
     *      description="Update Disponibilidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Disponibilidad",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Disponibilidad that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Disponibilidad")
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
     *                  ref="#/definitions/Disponibilidad"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateDisponibilidadAPIRequest $request)
    {
        $input = $request->all();

        /** @var Disponibilidad $disponibilidad */
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            return $this->sendError('Disponibilidad not found');
        }

        $disponibilidad = $this->disponibilidadRepository->update($input, $id);

        return $this->sendResponse($disponibilidad->toArray(), 'Disponibilidad updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/disponibilidads/{id}",
     *      summary="Remove the specified Disponibilidad from storage",
     *      tags={"Disponibilidad"},
     *      description="Delete Disponibilidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Disponibilidad",
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
        /** @var Disponibilidad $disponibilidad */
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            return $this->sendError('Disponibilidad not found');
        }

        $disponibilidad->delete();

        return $this->sendResponse($id, 'Disponibilidad deleted successfully');
    }
}
