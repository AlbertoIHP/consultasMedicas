<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateTipoBoxAPIRequest;
use App\Http\Requests\API\UpdateTipoBoxAPIRequest;
use App\Models\TipoBox;
use App\Repositories\TipoBoxRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class TipoBoxController
 * @package App\Http\Controllers\API
 */

class TipoBoxAPIController extends AppBaseController
{
    /** @var  TipoBoxRepository */
    private $tipoBoxRepository;

    public function __construct(TipoBoxRepository $tipoBoxRepo)
    {
        $this->tipoBoxRepository = $tipoBoxRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/tipoBoxes",
     *      summary="Get a listing of the TipoBoxes.",
     *      tags={"TipoBox"},
     *      description="Get all TipoBoxes",
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
     *                  @SWG\Items(ref="#/definitions/TipoBox")
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
        $this->tipoBoxRepository->pushCriteria(new RequestCriteria($request));
        $this->tipoBoxRepository->pushCriteria(new LimitOffsetCriteria($request));
        $tipoBoxes = $this->tipoBoxRepository->all();

        return $this->sendResponse($tipoBoxes->toArray(), 'Tipo Boxes retrieved successfully');
    }

    /**
     * @param CreateTipoBoxAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/tipoBoxes",
     *      summary="Store a newly created TipoBox in storage",
     *      tags={"TipoBox"},
     *      description="Store TipoBox",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="TipoBox that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/TipoBox")
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
     *                  ref="#/definitions/TipoBox"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateTipoBoxAPIRequest $request)
    {
        $input = $request->all();

        $tipoBoxes = $this->tipoBoxRepository->create($input);

        return $this->sendResponse($tipoBoxes->toArray(), 'Tipo Box saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/tipoBoxes/{id}",
     *      summary="Display the specified TipoBox",
     *      tags={"TipoBox"},
     *      description="Get TipoBox",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of TipoBox",
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
     *                  ref="#/definitions/TipoBox"
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
        /** @var TipoBox $tipoBox */
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            return $this->sendError('Tipo Box not found');
        }

        return $this->sendResponse($tipoBox->toArray(), 'Tipo Box retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateTipoBoxAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/tipoBoxes/{id}",
     *      summary="Update the specified TipoBox in storage",
     *      tags={"TipoBox"},
     *      description="Update TipoBox",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of TipoBox",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="TipoBox that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/TipoBox")
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
     *                  ref="#/definitions/TipoBox"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateTipoBoxAPIRequest $request)
    {
        $input = $request->all();

        /** @var TipoBox $tipoBox */
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            return $this->sendError('Tipo Box not found');
        }

        $tipoBox = $this->tipoBoxRepository->update($input, $id);

        return $this->sendResponse($tipoBox->toArray(), 'TipoBox updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/tipoBoxes/{id}",
     *      summary="Remove the specified TipoBox from storage",
     *      tags={"TipoBox"},
     *      description="Delete TipoBox",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of TipoBox",
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
        /** @var TipoBox $tipoBox */
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            return $this->sendError('Tipo Box not found');
        }

        $tipoBox->delete();

        return $this->sendResponse($id, 'Tipo Box deleted successfully');
    }
}
