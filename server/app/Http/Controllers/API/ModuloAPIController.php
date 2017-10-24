<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateModuloAPIRequest;
use App\Http\Requests\API\UpdateModuloAPIRequest;
use App\Models\Modulo;
use App\Repositories\ModuloRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ModuloController
 * @package App\Http\Controllers\API
 */

class ModuloAPIController extends AppBaseController
{
    /** @var  ModuloRepository */
    private $moduloRepository;

    public function __construct(ModuloRepository $moduloRepo)
    {
        $this->moduloRepository = $moduloRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/modulos",
     *      summary="Get a listing of the Modulos.",
     *      tags={"Modulo"},
     *      description="Get all Modulos",
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
     *                  @SWG\Items(ref="#/definitions/Modulo")
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
        $this->moduloRepository->pushCriteria(new RequestCriteria($request));
        $this->moduloRepository->pushCriteria(new LimitOffsetCriteria($request));
        $modulos = $this->moduloRepository->all();

        return $this->sendResponse($modulos->toArray(), 'Modulos retrieved successfully');
    }

    /**
     * @param CreateModuloAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/modulos",
     *      summary="Store a newly created Modulo in storage",
     *      tags={"Modulo"},
     *      description="Store Modulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Modulo that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Modulo")
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
     *                  ref="#/definitions/Modulo"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateModuloAPIRequest $request)
    {
        $input = $request->all();

        $modulos = $this->moduloRepository->create($input);

        return $this->sendResponse($modulos->toArray(), 'Modulo saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/modulos/{id}",
     *      summary="Display the specified Modulo",
     *      tags={"Modulo"},
     *      description="Get Modulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Modulo",
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
     *                  ref="#/definitions/Modulo"
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
        /** @var Modulo $modulo */
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            return $this->sendError('Modulo not found');
        }

        return $this->sendResponse($modulo->toArray(), 'Modulo retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateModuloAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/modulos/{id}",
     *      summary="Update the specified Modulo in storage",
     *      tags={"Modulo"},
     *      description="Update Modulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Modulo",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Modulo that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Modulo")
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
     *                  ref="#/definitions/Modulo"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateModuloAPIRequest $request)
    {
        $input = $request->all();

        /** @var Modulo $modulo */
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            return $this->sendError('Modulo not found');
        }

        $modulo = $this->moduloRepository->update($input, $id);

        return $this->sendResponse($modulo->toArray(), 'Modulo updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/modulos/{id}",
     *      summary="Remove the specified Modulo from storage",
     *      tags={"Modulo"},
     *      description="Delete Modulo",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Modulo",
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
        /** @var Modulo $modulo */
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            return $this->sendError('Modulo not found');
        }

        $modulo->delete();

        return $this->sendResponse($id, 'Modulo deleted successfully');
    }
}
