<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateOcupacionAPIRequest;
use App\Http\Requests\API\UpdateOcupacionAPIRequest;
use App\Models\Ocupacion;
use App\Repositories\OcupacionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class OcupacionController
 * @package App\Http\Controllers\API
 */

class OcupacionAPIController extends AppBaseController
{
    /** @var  OcupacionRepository */
    private $ocupacionRepository;

    public function __construct(OcupacionRepository $ocupacionRepo)
    {
        $this->ocupacionRepository = $ocupacionRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/ocupacions",
     *      summary="Get a listing of the Ocupacions.",
     *      tags={"Ocupacion"},
     *      description="Get all Ocupacions",
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
     *                  @SWG\Items(ref="#/definitions/Ocupacion")
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
        $this->ocupacionRepository->pushCriteria(new RequestCriteria($request));
        $this->ocupacionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $ocupacions = $this->ocupacionRepository->all();

        return $this->sendResponse($ocupacions->toArray(), 'Ocupacions retrieved successfully');
    }

    /**
     * @param CreateOcupacionAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/ocupacions",
     *      summary="Store a newly created Ocupacion in storage",
     *      tags={"Ocupacion"},
     *      description="Store Ocupacion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Ocupacion that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Ocupacion")
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
     *                  ref="#/definitions/Ocupacion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateOcupacionAPIRequest $request)
    {
        $input = $request->all();

        $ocupacions = $this->ocupacionRepository->create($input);

        return $this->sendResponse($ocupacions->toArray(), 'Ocupacion saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/ocupacions/{id}",
     *      summary="Display the specified Ocupacion",
     *      tags={"Ocupacion"},
     *      description="Get Ocupacion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Ocupacion",
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
     *                  ref="#/definitions/Ocupacion"
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
        /** @var Ocupacion $ocupacion */
        $ocupacion = $this->ocupacionRepository->findWithoutFail($id);

        if (empty($ocupacion)) {
            return $this->sendError('Ocupacion not found');
        }

        return $this->sendResponse($ocupacion->toArray(), 'Ocupacion retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateOcupacionAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/ocupacions/{id}",
     *      summary="Update the specified Ocupacion in storage",
     *      tags={"Ocupacion"},
     *      description="Update Ocupacion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Ocupacion",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Ocupacion that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Ocupacion")
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
     *                  ref="#/definitions/Ocupacion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateOcupacionAPIRequest $request)
    {
        $input = $request->all();

        /** @var Ocupacion $ocupacion */
        $ocupacion = $this->ocupacionRepository->findWithoutFail($id);

        if (empty($ocupacion)) {
            return $this->sendError('Ocupacion not found');
        }

        $ocupacion = $this->ocupacionRepository->update($input, $id);

        return $this->sendResponse($ocupacion->toArray(), 'Ocupacion updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/ocupacions/{id}",
     *      summary="Remove the specified Ocupacion from storage",
     *      tags={"Ocupacion"},
     *      description="Delete Ocupacion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Ocupacion",
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
        /** @var Ocupacion $ocupacion */
        $ocupacion = $this->ocupacionRepository->findWithoutFail($id);

        if (empty($ocupacion)) {
            return $this->sendError('Ocupacion not found');
        }

        $ocupacion->delete();

        return $this->sendResponse($id, 'Ocupacion deleted successfully');
    }
}
