<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateProvinciaAPIRequest;
use App\Http\Requests\API\UpdateProvinciaAPIRequest;
use App\Models\Provincia;
use App\Repositories\ProvinciaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ProvinciaController
 * @package App\Http\Controllers\API
 */

class ProvinciaAPIController extends AppBaseController
{
    /** @var  ProvinciaRepository */
    private $provinciaRepository;

    public function __construct(ProvinciaRepository $provinciaRepo)
    {
        $this->provinciaRepository = $provinciaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/provincias",
     *      summary="Get a listing of the Provincias.",
     *      tags={"Provincia"},
     *      description="Get all Provincias",
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
     *                  @SWG\Items(ref="#/definitions/Provincia")
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
        $this->provinciaRepository->pushCriteria(new RequestCriteria($request));
        $this->provinciaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $provincias = $this->provinciaRepository->all();

        return $this->sendResponse($provincias->toArray(), 'Provincias retrieved successfully');
    }

    /**
     * @param CreateProvinciaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/provincias",
     *      summary="Store a newly created Provincia in storage",
     *      tags={"Provincia"},
     *      description="Store Provincia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Provincia that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Provincia")
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
     *                  ref="#/definitions/Provincia"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateProvinciaAPIRequest $request)
    {
        $input = $request->all();

        $provincias = $this->provinciaRepository->create($input);

        return $this->sendResponse($provincias->toArray(), 'Provincia saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/provincias/{id}",
     *      summary="Display the specified Provincia",
     *      tags={"Provincia"},
     *      description="Get Provincia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Provincia",
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
     *                  ref="#/definitions/Provincia"
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
        /** @var Provincia $provincia */
        $provincia = $this->provinciaRepository->findWithoutFail($id);

        if (empty($provincia)) {
            return $this->sendError('Provincia not found');
        }

        return $this->sendResponse($provincia->toArray(), 'Provincia retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateProvinciaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/provincias/{id}",
     *      summary="Update the specified Provincia in storage",
     *      tags={"Provincia"},
     *      description="Update Provincia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Provincia",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Provincia that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Provincia")
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
     *                  ref="#/definitions/Provincia"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateProvinciaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Provincia $provincia */
        $provincia = $this->provinciaRepository->findWithoutFail($id);

        if (empty($provincia)) {
            return $this->sendError('Provincia not found');
        }

        $provincia = $this->provinciaRepository->update($input, $id);

        return $this->sendResponse($provincia->toArray(), 'Provincia updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/provincias/{id}",
     *      summary="Remove the specified Provincia from storage",
     *      tags={"Provincia"},
     *      description="Delete Provincia",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Provincia",
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
        /** @var Provincia $provincia */
        $provincia = $this->provinciaRepository->findWithoutFail($id);

        if (empty($provincia)) {
            return $this->sendError('Provincia not found');
        }

        $provincia->delete();

        return $this->sendResponse($id, 'Provincia deleted successfully');
    }
}
