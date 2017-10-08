<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateRecetaAPIRequest;
use App\Http\Requests\API\UpdateRecetaAPIRequest;
use App\Models\Receta;
use App\Repositories\RecetaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class RecetaController
 * @package App\Http\Controllers\API
 */

class RecetaAPIController extends AppBaseController
{
    /** @var  RecetaRepository */
    private $recetaRepository;

    public function __construct(RecetaRepository $recetaRepo)
    {
        $this->recetaRepository = $recetaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/recetas",
     *      summary="Get a listing of the Recetas.",
     *      tags={"Receta"},
     *      description="Get all Recetas",
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
     *                  @SWG\Items(ref="#/definitions/Receta")
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
        $this->recetaRepository->pushCriteria(new RequestCriteria($request));
        $this->recetaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $recetas = $this->recetaRepository->all();

        return $this->sendResponse($recetas->toArray(), 'Recetas retrieved successfully');
    }

    /**
     * @param CreateRecetaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/recetas",
     *      summary="Store a newly created Receta in storage",
     *      tags={"Receta"},
     *      description="Store Receta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Receta that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Receta")
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
     *                  ref="#/definitions/Receta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateRecetaAPIRequest $request)
    {
        $input = $request->all();

        $recetas = $this->recetaRepository->create($input);

        return $this->sendResponse($recetas->toArray(), 'Receta saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/recetas/{id}",
     *      summary="Display the specified Receta",
     *      tags={"Receta"},
     *      description="Get Receta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Receta",
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
     *                  ref="#/definitions/Receta"
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
        /** @var Receta $receta */
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            return $this->sendError('Receta not found');
        }

        return $this->sendResponse($receta->toArray(), 'Receta retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateRecetaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/recetas/{id}",
     *      summary="Update the specified Receta in storage",
     *      tags={"Receta"},
     *      description="Update Receta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Receta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Receta that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Receta")
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
     *                  ref="#/definitions/Receta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateRecetaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Receta $receta */
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            return $this->sendError('Receta not found');
        }

        $receta = $this->recetaRepository->update($input, $id);

        return $this->sendResponse($receta->toArray(), 'Receta updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/recetas/{id}",
     *      summary="Remove the specified Receta from storage",
     *      tags={"Receta"},
     *      description="Delete Receta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Receta",
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
        /** @var Receta $receta */
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            return $this->sendError('Receta not found');
        }

        $receta->delete();

        return $this->sendResponse($id, 'Receta deleted successfully');
    }
}
