<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePrevisionActualAPIRequest;
use App\Http\Requests\API\UpdatePrevisionActualAPIRequest;
use App\Models\PrevisionActual;
use App\Repositories\PrevisionActualRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PrevisionActualController
 * @package App\Http\Controllers\API
 */

class PrevisionActualAPIController extends AppBaseController
{
    /** @var  PrevisionActualRepository */
    private $previsionActualRepository;

    public function __construct(PrevisionActualRepository $previsionActualRepo)
    {
        $this->previsionActualRepository = $previsionActualRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/previsionActuals",
     *      summary="Get a listing of the PrevisionActuals.",
     *      tags={"PrevisionActual"},
     *      description="Get all PrevisionActuals",
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
     *                  @SWG\Items(ref="#/definitions/PrevisionActual")
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
        $this->previsionActualRepository->pushCriteria(new RequestCriteria($request));
        $this->previsionActualRepository->pushCriteria(new LimitOffsetCriteria($request));
        $previsionActuals = $this->previsionActualRepository->all();

        return $this->sendResponse($previsionActuals->toArray(), 'Prevision Actuals retrieved successfully');
    }

    /**
     * @param CreatePrevisionActualAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/previsionActuals",
     *      summary="Store a newly created PrevisionActual in storage",
     *      tags={"PrevisionActual"},
     *      description="Store PrevisionActual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="PrevisionActual that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/PrevisionActual")
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
     *                  ref="#/definitions/PrevisionActual"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePrevisionActualAPIRequest $request)
    {
        $input = $request->all();

        $previsionActuals = $this->previsionActualRepository->create($input);

        return $this->sendResponse($previsionActuals->toArray(), 'Prevision Actual saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/previsionActuals/{id}",
     *      summary="Display the specified PrevisionActual",
     *      tags={"PrevisionActual"},
     *      description="Get PrevisionActual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PrevisionActual",
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
     *                  ref="#/definitions/PrevisionActual"
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
        /** @var PrevisionActual $previsionActual */
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            return $this->sendError('Prevision Actual not found');
        }

        return $this->sendResponse($previsionActual->toArray(), 'Prevision Actual retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePrevisionActualAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/previsionActuals/{id}",
     *      summary="Update the specified PrevisionActual in storage",
     *      tags={"PrevisionActual"},
     *      description="Update PrevisionActual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PrevisionActual",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="PrevisionActual that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/PrevisionActual")
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
     *                  ref="#/definitions/PrevisionActual"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePrevisionActualAPIRequest $request)
    {
        $input = $request->all();

        /** @var PrevisionActual $previsionActual */
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            return $this->sendError('Prevision Actual not found');
        }

        $previsionActual = $this->previsionActualRepository->update($input, $id);

        return $this->sendResponse($previsionActual->toArray(), 'PrevisionActual updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/previsionActuals/{id}",
     *      summary="Remove the specified PrevisionActual from storage",
     *      tags={"PrevisionActual"},
     *      description="Delete PrevisionActual",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PrevisionActual",
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
        /** @var PrevisionActual $previsionActual */
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            return $this->sendError('Prevision Actual not found');
        }

        $previsionActual->delete();

        return $this->sendResponse($id, 'Prevision Actual deleted successfully');
    }
}
