<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateGeneroAPIRequest;
use App\Http\Requests\API\UpdateGeneroAPIRequest;
use App\Models\Genero;
use App\Repositories\GeneroRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class GeneroController
 * @package App\Http\Controllers\API
 */

class GeneroAPIController extends AppBaseController
{
    /** @var  GeneroRepository */
    private $generoRepository;

    public function __construct(GeneroRepository $generoRepo)
    {
        $this->generoRepository = $generoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/generos",
     *      summary="Get a listing of the Generos.",
     *      tags={"Genero"},
     *      description="Get all Generos",
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
     *                  @SWG\Items(ref="#/definitions/Genero")
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
        $this->generoRepository->pushCriteria(new RequestCriteria($request));
        $this->generoRepository->pushCriteria(new LimitOffsetCriteria($request));
        $generos = $this->generoRepository->all();

        return $this->sendResponse($generos->toArray(), 'Generos retrieved successfully');
    }

    /**
     * @param CreateGeneroAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/generos",
     *      summary="Store a newly created Genero in storage",
     *      tags={"Genero"},
     *      description="Store Genero",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Genero that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Genero")
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
     *                  ref="#/definitions/Genero"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateGeneroAPIRequest $request)
    {
        $input = $request->all();

        $generos = $this->generoRepository->create($input);

        return $this->sendResponse($generos->toArray(), 'Genero saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/generos/{id}",
     *      summary="Display the specified Genero",
     *      tags={"Genero"},
     *      description="Get Genero",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Genero",
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
     *                  ref="#/definitions/Genero"
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
        /** @var Genero $genero */
        $genero = $this->generoRepository->findWithoutFail($id);

        if (empty($genero)) {
            return $this->sendError('Genero not found');
        }

        return $this->sendResponse($genero->toArray(), 'Genero retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateGeneroAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/generos/{id}",
     *      summary="Update the specified Genero in storage",
     *      tags={"Genero"},
     *      description="Update Genero",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Genero",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Genero that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Genero")
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
     *                  ref="#/definitions/Genero"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateGeneroAPIRequest $request)
    {
        $input = $request->all();

        /** @var Genero $genero */
        $genero = $this->generoRepository->findWithoutFail($id);

        if (empty($genero)) {
            return $this->sendError('Genero not found');
        }

        $genero = $this->generoRepository->update($input, $id);

        return $this->sendResponse($genero->toArray(), 'Genero updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/generos/{id}",
     *      summary="Remove the specified Genero from storage",
     *      tags={"Genero"},
     *      description="Delete Genero",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Genero",
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
        /** @var Genero $genero */
        $genero = $this->generoRepository->findWithoutFail($id);

        if (empty($genero)) {
            return $this->sendError('Genero not found');
        }

        $genero->delete();

        return $this->sendResponse($id, 'Genero deleted successfully');
    }
}
