<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateAtencionAPIRequest;
use App\Http\Requests\API\UpdateAtencionAPIRequest;
use App\Models\Atencion;
use App\Repositories\AtencionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class AtencionController
 * @package App\Http\Controllers\API
 */

class AtencionAPIController extends AppBaseController
{
    /** @var  AtencionRepository */
    private $atencionRepository;

    public function __construct(AtencionRepository $atencionRepo)
    {
        $this->atencionRepository = $atencionRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/atencions",
     *      summary="Get a listing of the Atencions.",
     *      tags={"Atencion"},
     *      description="Get all Atencions",
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
     *                  @SWG\Items(ref="#/definitions/Atencion")
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
        $this->atencionRepository->pushCriteria(new RequestCriteria($request));
        $this->atencionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $atencions = $this->atencionRepository->all();

        return $this->sendResponse($atencions->toArray(), 'Atencions retrieved successfully');
    }

    /**
     * @param CreateAtencionAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/atencions",
     *      summary="Store a newly created Atencion in storage",
     *      tags={"Atencion"},
     *      description="Store Atencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Atencion that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Atencion")
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
     *                  ref="#/definitions/Atencion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateAtencionAPIRequest $request)
    {
        $input = $request->all();

        $atencions = $this->atencionRepository->create($input);

        return $this->sendResponse($atencions->toArray(), 'Atencion saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/atencions/{id}",
     *      summary="Display the specified Atencion",
     *      tags={"Atencion"},
     *      description="Get Atencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Atencion",
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
     *                  ref="#/definitions/Atencion"
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
        /** @var Atencion $atencion */
        $atencion = $this->atencionRepository->findWithoutFail($id);

        if (empty($atencion)) {
            return $this->sendError('Atencion not found');
        }

        return $this->sendResponse($atencion->toArray(), 'Atencion retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateAtencionAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/atencions/{id}",
     *      summary="Update the specified Atencion in storage",
     *      tags={"Atencion"},
     *      description="Update Atencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Atencion",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Atencion that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Atencion")
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
     *                  ref="#/definitions/Atencion"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateAtencionAPIRequest $request)
    {
        $input = $request->all();

        /** @var Atencion $atencion */
        $atencion = $this->atencionRepository->findWithoutFail($id);

        if (empty($atencion)) {
            return $this->sendError('Atencion not found');
        }

        $atencion = $this->atencionRepository->update($input, $id);

        return $this->sendResponse($atencion->toArray(), 'Atencion updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/atencions/{id}",
     *      summary="Remove the specified Atencion from storage",
     *      tags={"Atencion"},
     *      description="Delete Atencion",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Atencion",
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
        /** @var Atencion $atencion */
        $atencion = $this->atencionRepository->findWithoutFail($id);

        if (empty($atencion)) {
            return $this->sendError('Atencion not found');
        }

        $atencion->delete();

        return $this->sendResponse($id, 'Atencion deleted successfully');
    }
}
