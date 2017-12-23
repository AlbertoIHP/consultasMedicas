<?php

use Faker\Factory as Faker;
use App\Models\Horario;
use App\Repositories\HorarioRepository;

trait MakeHorarioTrait
{
    /**
     * Create fake instance of Horario and save it in database
     *
     * @param array $horarioFields
     * @return Horario
     */
    public function makeHorario($horarioFields = [])
    {
        /** @var HorarioRepository $horarioRepo */
        $horarioRepo = App::make(HorarioRepository::class);
        $theme = $this->fakeHorarioData($horarioFields);
        return $horarioRepo->create($theme);
    }

    /**
     * Get fake instance of Horario
     *
     * @param array $horarioFields
     * @return Horario
     */
    public function fakeHorario($horarioFields = [])
    {
        return new Horario($this->fakeHorarioData($horarioFields));
    }

    /**
     * Get fake data of Horario
     *
     * @param array $postFields
     * @return array
     */
    public function fakeHorarioData($horarioFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'dia' => $fake->randomDigitNotNull,
            'horaInicio' => $fake->randomDigitNotNull,
            'improvisado' => $fake->randomDigitNotNull,
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s'),
            'deleted_at' => $fake->date('Y-m-d H:i:s')
        ], $horarioFields);
    }
}
