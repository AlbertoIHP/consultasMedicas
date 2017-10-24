<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePermisoModuloAPIRequest;
use App\Http\Requests\API\UpdatePermisoModuloAPIRequest;
use App\Models\PermisoModulo;
use App\Repositories\PermisoModuloRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PermisoModuloController
 * @package App\Http\Controllers\API
 */

class PermisoModuloAPIController extends AppBaseController
{
    /** @var  PermisoModuloRepository */
    private $permisoModuloRepository;

    public function __construct(PermisoModuloRepository $permisoModuloRepo)
    {
        $this->permisoModuloRepository = $permisoModuloRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/permisoModulos",
     *      summary="Get a listing of the PermisoModulos.",
     *      tags={"PermisoModulo"},
     *      description="Get all PermisoModulos",
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
     *                  @SWG\Items(ref="#/definitions/PermisoModulo")
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
        $this->permisoModuloRepository->pushCriteria(new RequestCriteria($request));
        $this->permisoModuloRepository->pushCriteria(new LimitOffsetCriteria($request));
        $permisoModulos = $this->permisoModuloRepository->all();

        return $this->sendResponse($permisoModulos->toArray(), 'Permiso Modulos retrieved successfully');
    }

    /**
     * @param CreatePermisoModuloAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/permisoModulos",
     *      summary="Store a newly created PermisoModulo in storage",
     *      tags={"PermisoModulo"},
     *      description="Store PermisoModulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="PermisoModulo that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/PermisoModulo")
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
     *                  ref="#/definitions/PermisoModulo"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePermisoModuloAPIRequest $request)
    {
        $input = $request->all();

        $permisoModulos = $this->permisoModuloRepository->create($input);

        return $this->sendResponse($permisoModulos->toArray(), 'Permiso Modulo saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/permisoModulos/{id}",
     *      summary="Display the specified PermisoModulo",
     *      tags={"PermisoModulo"},
     *      description="Get PermisoModulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PermisoModulo",
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
     *                  ref="#/definitions/PermisoModulo"
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
        /** @var PermisoModulo $permisoModulo */
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            return $this->sendError('Permiso Modulo not found');
        }

        return $this->sendResponse($permisoModulo->toArray(), 'Permiso Modulo retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePermisoModuloAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/permisoModulos/{id}",
     *      summary="Update the specified PermisoModulo in storage",
     *      tags={"PermisoModulo"},
     *      description="Update PermisoModulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PermisoModulo",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="PermisoModulo that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/PermisoModulo")
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
     *                  ref="#/definitions/PermisoModulo"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePermisoModuloAPIRequest $request)
    {
        $input = $request->all();

        /** @var PermisoModulo $permisoModulo */
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            return $this->sendError('Permiso Modulo not found');
        }

        $permisoModulo = $this->permisoModuloRepository->update($input, $id);

        return $this->sendResponse($permisoModulo->toArray(), 'PermisoModulo updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/permisoModulos/{id}",
     *      summary="Remove the specified PermisoModulo from storage",
     *      tags={"PermisoModulo"},
     *      description="Delete PermisoModulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PermisoModulo",
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
        /** @var PermisoModulo $permisoModulo */
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            return $this->sendError('Permiso Modulo not found');
        }

        $permisoModulo->delete();

        return $this->sendResponse($id, 'Permiso Modulo deleted successfully');
    }
}
