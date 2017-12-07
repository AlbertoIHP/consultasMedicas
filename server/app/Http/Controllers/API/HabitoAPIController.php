<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateHabitoAPIRequest;
use App\Http\Requests\API\UpdateHabitoAPIRequest;
use App\Models\Habito;
use App\Repositories\HabitoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class HabitoController
 * @package App\Http\Controllers\API
 */

class HabitoAPIController extends AppBaseController
{
    /** @var  HabitoRepository */
    private $habitoRepository;

    public function __construct(HabitoRepository $habitoRepo)
    {
        $this->habitoRepository = $habitoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitos",
     *      summary="Get a listing of the Habitos.",
     *      tags={"Habito"},
     *      description="Get all Habitos",
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
     *                  @SWG\Items(ref="#/definitions/Habito")
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
        $this->habitoRepository->pushCriteria(new RequestCriteria($request));
        $this->habitoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $habitos = $this->habitoRepository->all();

        return $this->sendResponse($habitos->toArray(), 'Habitos retrieved successfully');
    }

    /**
     * @param CreateHabitoAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/habitos",
     *      summary="Store a newly created Habito in storage",
     *      tags={"Habito"},
     *      description="Store Habito",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Habito that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Habito")
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
     *                  ref="#/definitions/Habito"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateHabitoAPIRequest $request)
    {
        $input = $request->all();

        $habitos = $this->habitoRepository->create($input);

        return $this->sendResponse($habitos->toArray(), 'Habito saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/habitos/{id}",
     *      summary="Display the specified Habito",
     *      tags={"Habito"},
     *      description="Get Habito",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Habito",
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
     *                  ref="#/definitions/Habito"
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
        /** @var Habito $habito */
        $habito = $this->habitoRepository->findWithoutFail($id);

        if (empty($habito)) {
            return $this->sendError('Habito not found');
        }

        return $this->sendResponse($habito->toArray(), 'Habito retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateHabitoAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/habitos/{id}",
     *      summary="Update the specified Habito in storage",
     *      tags={"Habito"},
     *      description="Update Habito",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Habito",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Habito that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Habito")
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
     *                  ref="#/definitions/Habito"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateHabitoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Habito $habito */
        $habito = $this->habitoRepository->findWithoutFail($id);

        if (empty($habito)) {
            return $this->sendError('Habito not found');
        }

        $habito = $this->habitoRepository->update($input, $id);

        return $this->sendResponse($habito->toArray(), 'Habito updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/habitos/{id}",
     *      summary="Remove the specified Habito from storage",
     *      tags={"Habito"},
     *      description="Delete Habito",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Habito",
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
        /** @var Habito $habito */
        $habito = $this->habitoRepository->findWithoutFail($id);

        if (empty($habito)) {
            return $this->sendError('Habito not found');
        }

        $habito->delete();

        return $this->sendResponse($id, 'Habito deleted successfully');
    }
}
