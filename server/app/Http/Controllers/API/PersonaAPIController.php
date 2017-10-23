<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePersonaAPIRequest;
use App\Http\Requests\API\UpdatePersonaAPIRequest;
use App\Models\Persona;
use App\Repositories\PersonaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PersonaController
 * @package App\Http\Controllers\API
 */

class PersonaAPIController extends AppBaseController
{
    /** @var  PersonaRepository */
    private $personaRepository;

    public function __construct(PersonaRepository $personaRepo)
    {
        $this->personaRepository = $personaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/personas",
     *      summary="Get a listing of the Personas.",
     *      tags={"Persona"},
     *      description="Get all Personas",
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
     *                  @SWG\Items(ref="#/definitions/Persona")
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
        $this->personaRepository->pushCriteria(new RequestCriteria($request));
        $this->personaRepository->pushCriteria(new LimitOffsetCriteria($request));
        $personas = $this->personaRepository->all();

        return $this->sendResponse($personas->toArray(), 'Personas retrieved successfully');
    }

    /**
     * @param CreatePersonaAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/personas",
     *      summary="Store a newly created Persona in storage",
     *      tags={"Persona"},
     *      description="Store Persona",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Persona that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Persona")
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
     *                  ref="#/definitions/Persona"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePersonaAPIRequest $request)
    {
        $input = $request->all();

        $personas = $this->personaRepository->create($input);

        return $this->sendResponse($personas->toArray(), 'Persona saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/personas/{id}",
     *      summary="Display the specified Persona",
     *      tags={"Persona"},
     *      description="Get Persona",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Persona",
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
     *                  ref="#/definitions/Persona"
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
        /** @var Persona $persona */
        $persona = $this->personaRepository->findWithoutFail($id);

        if (empty($persona)) {
            return $this->sendError('Persona not found');
        }

        return $this->sendResponse($persona->toArray(), 'Persona retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePersonaAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/personas/{id}",
     *      summary="Update the specified Persona in storage",
     *      tags={"Persona"},
     *      description="Update Persona",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Persona",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Persona that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Persona")
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
     *                  ref="#/definitions/Persona"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePersonaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Persona $persona */
        $persona = $this->personaRepository->findWithoutFail($id);

        if (empty($persona)) {
            return $this->sendError('Persona not found');
        }

        $persona = $this->personaRepository->update($input, $id);

        return $this->sendResponse($persona->toArray(), 'Persona updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/personas/{id}",
     *      summary="Remove the specified Persona from storage",
     *      tags={"Persona"},
     *      description="Delete Persona",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Persona",
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
        /** @var Persona $persona */
        $persona = $this->personaRepository->findWithoutFail($id);

        if (empty($persona)) {
            return $this->sendError('Persona not found');
        }

        $persona->delete();

        return $this->sendResponse($id, 'Persona deleted successfully');
    }
}
