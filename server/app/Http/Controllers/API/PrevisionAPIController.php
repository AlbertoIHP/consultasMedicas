<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePrevisionAPIRequest;
use App\Http\Requests\API\UpdatePrevisionAPIRequest;
use App\Models\Prevision;
use App\Repositories\PrevisionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PrevisionController
 * @package App\Http\Controllers\API
 */

class PrevisionAPIController extends AppBaseController
{
    /** @var  PrevisionRepository */
    private $previsionRepository;

    public function __construct(PrevisionRepository $previsionRepo)
    {
        $this->previsionRepository = $previsionRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/previsions",
     *      summary="Get a listing of the Previsions.",
     *      tags={"Prevision"},
     *      description="Get all Previsions",
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
     *                  @SWG\Items(ref="#/definitions/Prevision")
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
        $this->previsionRepository->pushCriteria(new RequestCriteria($request));
        $this->previsionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $previsions = $this->previsionRepository->all();

        return $this->sendResponse($previsions->toArray(), 'Previsions retrieved successfully');
    }

    /**
     * @param CreatePrevisionAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/previsions",
     *      summary="Store a newly created Prevision in storage",
     *      tags={"Prevision"},
     *      description="Store Prevision",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Prevision that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Prevision")
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
     *                  ref="#/definitions/Prevision"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePrevisionAPIRequest $request)
    {
        $input = $request->all();

        $previsions = $this->previsionRepository->create($input);

        return $this->sendResponse($previsions->toArray(), 'Prevision saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/previsions/{id}",
     *      summary="Display the specified Prevision",
     *      tags={"Prevision"},
     *      description="Get Prevision",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Prevision",
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
     *                  ref="#/definitions/Prevision"
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
        /** @var Prevision $prevision */
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            return $this->sendError('Prevision not found');
        }

        return $this->sendResponse($prevision->toArray(), 'Prevision retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePrevisionAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/previsions/{id}",
     *      summary="Update the specified Prevision in storage",
     *      tags={"Prevision"},
     *      description="Update Prevision",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Prevision",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Prevision that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Prevision")
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
     *                  ref="#/definitions/Prevision"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePrevisionAPIRequest $request)
    {
        $input = $request->all();

        /** @var Prevision $prevision */
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            return $this->sendError('Prevision not found');
        }

        $prevision = $this->previsionRepository->update($input, $id);

        return $this->sendResponse($prevision->toArray(), 'Prevision updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/previsions/{id}",
     *      summary="Remove the specified Prevision from storage",
     *      tags={"Prevision"},
     *      description="Delete Prevision",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Prevision",
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
        /** @var Prevision $prevision */
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            return $this->sendError('Prevision not found');
        }

        $prevision->delete();

        return $this->sendResponse($id, 'Prevision deleted successfully');
    }
}
