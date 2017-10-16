<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateEstadoCivilAPIRequest;
use App\Http\Requests\API\UpdateEstadoCivilAPIRequest;
use App\Models\EstadoCivil;
use App\Repositories\EstadoCivilRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class EstadoCivilController
 * @package App\Http\Controllers\API
 */

class EstadoCivilAPIController extends AppBaseController
{
    /** @var  EstadoCivilRepository */
    private $estadoCivilRepository;

    public function __construct(EstadoCivilRepository $estadoCivilRepo)
    {
        $this->estadoCivilRepository = $estadoCivilRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/estadoCivils",
     *      summary="Get a listing of the EstadoCivils.",
     *      tags={"EstadoCivil"},
     *      description="Get all EstadoCivils",
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
     *                  @SWG\Items(ref="#/definitions/EstadoCivil")
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
        $this->estadoCivilRepository->pushCriteria(new RequestCriteria($request));
        $this->estadoCivilRepository->pushCriteria(new LimitOffsetCriteria($request));
        $estadoCivils = $this->estadoCivilRepository->all();

        return $this->sendResponse($estadoCivils->toArray(), 'Estado Civils retrieved successfully');
    }

    /**
     * @param CreateEstadoCivilAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/estadoCivils",
     *      summary="Store a newly created EstadoCivil in storage",
     *      tags={"EstadoCivil"},
     *      description="Store EstadoCivil",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EstadoCivil that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EstadoCivil")
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
     *                  ref="#/definitions/EstadoCivil"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateEstadoCivilAPIRequest $request)
    {
        $input = $request->all();

        $estadoCivils = $this->estadoCivilRepository->create($input);

        return $this->sendResponse($estadoCivils->toArray(), 'Estado Civil saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/estadoCivils/{id}",
     *      summary="Display the specified EstadoCivil",
     *      tags={"EstadoCivil"},
     *      description="Get EstadoCivil",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EstadoCivil",
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
     *                  ref="#/definitions/EstadoCivil"
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
        /** @var EstadoCivil $estadoCivil */
        $estadoCivil = $this->estadoCivilRepository->findWithoutFail($id);

        if (empty($estadoCivil)) {
            return $this->sendError('Estado Civil not found');
        }

        return $this->sendResponse($estadoCivil->toArray(), 'Estado Civil retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateEstadoCivilAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/estadoCivils/{id}",
     *      summary="Update the specified EstadoCivil in storage",
     *      tags={"EstadoCivil"},
     *      description="Update EstadoCivil",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EstadoCivil",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="EstadoCivil that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/EstadoCivil")
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
     *                  ref="#/definitions/EstadoCivil"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateEstadoCivilAPIRequest $request)
    {
        $input = $request->all();

        /** @var EstadoCivil $estadoCivil */
        $estadoCivil = $this->estadoCivilRepository->findWithoutFail($id);

        if (empty($estadoCivil)) {
            return $this->sendError('Estado Civil not found');
        }

        $estadoCivil = $this->estadoCivilRepository->update($input, $id);

        return $this->sendResponse($estadoCivil->toArray(), 'EstadoCivil updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/estadoCivils/{id}",
     *      summary="Remove the specified EstadoCivil from storage",
     *      tags={"EstadoCivil"},
     *      description="Delete EstadoCivil",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of EstadoCivil",
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
        /** @var EstadoCivil $estadoCivil */
        $estadoCivil = $this->estadoCivilRepository->findWithoutFail($id);

        if (empty($estadoCivil)) {
            return $this->sendError('Estado Civil not found');
        }

        $estadoCivil->delete();

        return $this->sendResponse($id, 'Estado Civil deleted successfully');
    }
}
