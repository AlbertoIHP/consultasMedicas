<?php

use Faker\Factory as Faker;
use App\Models\Atention;
use App\Repositories\AtentionRepository;

trait MakeAtentionTrait
{
    /**
     * Create fake instance of Atention and save it in database
     *
     * @param array $atentionFields
     * @return Atention
     */
    public function makeAtention($atentionFields = [])
    {
        /** @var AtentionRepository $atentionRepo */
        $atentionRepo = App::make(AtentionRepository::class);
        $theme = $this->fakeAtentionData($atentionFields);
        return $atentionRepo->create($theme);
    }

    /**
     * Get fake instance of Atention
     *
     * @param array $atentionFields
     * @return Atention
     */
    public function fakeAtention($atentionFields = [])
    {
        return new Atention($this->fakeAtentionData($atentionFields));
    }

    /**
     * Get fake data of Atention
     *
     * @param array $postFields
     * @return array
     */
    public function fakeAtentionData($atentionFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Cita_idCita' => $fake->randomDigitNotNull,
            'Doctor_rut' => $fake->word,
            'BoxConsulta_idConsulta' => $fake->randomDigitNotNull
        ], $atentionFields);
    }
}
