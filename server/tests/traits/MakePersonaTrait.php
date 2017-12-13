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
            'rut' => $fake->word,
            'nombre1' => $fake->word,
            'nombre2' => $fake->word,
            'apellido1' => $fake->word,
            'apellido2' => $fake->word,
            'fono_casa' => $fake->word,
            'fono_trabajo' => $fake->word,
            'movil' => $fake->word,
            'estado' => $fake->randomDigitNotNull,
            'fechaNacimiento' => $fake->word,
            'direccion' => $fake->word,
            'Genero_id' => $fake->randomDigitNotNull,
            'Comuna_id' => $fake->randomDigitNotNull,
            'EstadoCivil_id' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $personaFields);
    }
}
