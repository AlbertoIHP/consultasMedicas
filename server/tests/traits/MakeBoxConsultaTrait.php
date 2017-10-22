<?php

use Faker\Factory as Faker;
use App\Models\BoxConsulta;
use App\Repositories\BoxConsultaRepository;

trait MakeBoxConsultaTrait
{
    /**
     * Create fake instance of BoxConsulta and save it in database
     *
     * @param array $boxConsultaFields
     * @return BoxConsulta
     */
    public function makeBoxConsulta($boxConsultaFields = [])
    {
        /** @var BoxConsultaRepository $boxConsultaRepo */
        $boxConsultaRepo = App::make(BoxConsultaRepository::class);
        $theme = $this->fakeBoxConsultaData($boxConsultaFields);
        return $boxConsultaRepo->create($theme);
    }

    /**
     * Get fake instance of BoxConsulta
     *
     * @param array $boxConsultaFields
     * @return BoxConsulta
     */
    public function fakeBoxConsulta($boxConsultaFields = [])
    {
        return new BoxConsulta($this->fakeBoxConsultaData($boxConsultaFields));
    }

    /**
     * Get fake data of BoxConsulta
     *
     * @param array $postFields
     * @return array
     */
    public function fakeBoxConsultaData($boxConsultaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'ubicacion' => $fake->word,
            'TipoBox_idTipoBox' => $fake->randomDigitNotNull
        ], $boxConsultaFields);
    }
}
