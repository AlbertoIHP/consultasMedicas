<?php

use Faker\Factory as Faker;
use App\Models\Persona;
use App\Repositories\PersonaRepository;

trait MakePersonaTrait
{
    /**
     * Create fake instance of Persona and save it in database
     *
     * @param array $personaFields
     * @return Persona
     */
    public function makePersona($personaFields = [])
    {
        /** @var PersonaRepository $personaRepo */
        $personaRepo = App::make(PersonaRepository::class);
        $theme = $this->fakePersonaData($personaFields);
        return $personaRepo->create($theme);
    }

    /**
     * Get fake instance of Persona
     *
     * @param array $personaFields
     * @return Persona
     */
    public function fakePersona($personaFields = [])
    {
        return new Persona($this->fakePersonaData($personaFields));
    }

    /**
     * Get fake data of Persona
     *
     * @param array $postFields
     * @return array
     */
    public function fakePersonaData($personaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nombre1' => $fake->word,
            'nombre2' => $fake->word,
            'apellido1' => $fake->word,
            'apellido2' => $fake->word,
            'tipo' => $fake->word,
            'idRegion' => $fake->randomDigitNotNull,
            'idProvincia' => $fake->randomDigitNotNull,
            'fono_casa' => $fake->word,
            'fono_trabajo' => $fake->word,
            'movil' => $fake->word,
            'idGenero' => $fake->randomDigitNotNull,
            'FichaMedica_rut' => $fake->word,
            'EstadoCivil_idEstadoCivil' => $fake->randomDigitNotNull,
            'Comuna_Provincia_idProvincia' => $fake->randomDigitNotNull,
            'Comuna_idComuna' => $fake->randomDigitNotNull
        ], $personaFields);
    }
}
