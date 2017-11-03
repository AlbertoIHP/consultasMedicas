<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateEspecialidadAPIRequest;
use App\Http\Requests\API\UpdateEspecialidadAPIRequest;
use App\Models\Especialidad;
use App\Repositories\EspecialidadRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class EspecialidadController
 * @package App\Http\Controllers\API
 */

class EspecialidadAPIController extends AppBaseController
{
    /** @var  EspecialidadRepository */
    private $especialidadRepository;

    public function __construct(EspecialidadRepository $especialidadRepo)
    {
        $this->especialidadRepository = $especialidadRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/especialidads",
     *      summary="Get a listing of the Especialidads.",
     *      tags={"Especialidad"},
     *      description="Get all Especialidads",
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
     *                  @SWG\Items(ref="#/definitions/Especialidad")
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
        $this->especialidadRepository->pushCriteria(new RequestCriteria($request));
        $this->especialidadRepository->pushCriteria(new LimitOffsetCriteria($request));
        $especialidads = $this->especialidadRepository->all();

        return $this->sendResponse($especialidads->toArray(), 'Especialidads retrieved successfully');
    }

    /**
     * @param CreateEspecialidadAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/especialidads",
     *      summary="Store a newly created Especialidad in storage",
     *      tags={"Especialidad"},
     *      description="Store Especialidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Especialidad that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Especialidad")
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
     *                  ref="#/definitions/Especialidad"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateEspecialidadAPIRequest $request)
    {
        $input = $request->all();

        $especialidads = $this->especialidadRepository->create($input);

        return $this->sendResponse($especialidads->toArray(), 'Especialidad saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/especialidads/{id}",
     *      summary="Display the specified Especialidad",
     *      tags={"Especialidad"},
     *      description="Get Especialidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Especialidad",
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
     *                  ref="#/definitions/Especialidad"
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
        /** @var Especialidad $especialidad */
        $especialidad = $this->especialidadRepository->findWithoutFail($id);

        if (empty($especialidad)) {
            return $this->sendError('Especialidad not found');
        }

        return $this->sendResponse($especialidad->toArray(), 'Especialidad retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateEspecialidadAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/especialidads/{id}",
     *      summary="Update the specified Especialidad in storage",
     *      tags={"Especialidad"},
     *      description="Update Especialidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Especialidad",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Especialidad that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Especialidad")
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
     *                  ref="#/definitions/Especialidad"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateEspecialidadAPIRequest $request)
    {
        $input = $request->all();

        /** @var Especialidad $especialidad */
        $especialidad = $this->especialidadRepository->findWithoutFail($id);

        if (empty($especialidad)) {
            return $this->sendError('Especialidad not found');
        }

        $especialidad = $this->especialidadRepository->update($input, $id);

        return $this->sendResponse($especialidad->toArray(), 'Especialidad updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/especialidads/{id}",
     *      summary="Remove the specified Especialidad from storage",
     *      tags={"Especialidad"},
     *      description="Delete Especialidad",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Especialidad",
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
        /** @var Especialidad $especialidad */
        $especialidad = $this->especialidadRepository->findWithoutFail($id);

        if (empty($especialidad)) {
            return $this->sendError('Especialidad not found');
        }

        $especialidad->delete();

        return $this->sendResponse($id, 'Especialidad deleted successfully');
    }
}
