<?php

use Faker\Factory as Faker;
use App\Models\PermisoModulo;
use App\Repositories\PermisoModuloRepository;

trait MakePermisoModuloTrait
{
    /**
     * Create fake instance of PermisoModulo and save it in database
     *
     * @param array $permisoModuloFields
     * @return PermisoModulo
     */
    public function makePermisoModulo($permisoModuloFields = [])
    {
        /** @var PermisoModuloRepository $permisoModuloRepo */
        $permisoModuloRepo = App::make(PermisoModuloRepository::class);
        $theme = $this->fakePermisoModuloData($permisoModuloFields);
        return $permisoModuloRepo->create($theme);
    }

    /**
     * Get fake instance of PermisoModulo
     *
     * @param array $permisoModuloFields
     * @return PermisoModulo
     */
    public function fakePermisoModulo($permisoModuloFields = [])
    {
        return new PermisoModulo($this->fakePermisoModuloData($permisoModuloFields));
    }

    /**
     * Get fake data of PermisoModulo
     *
     * @param array $postFields
     * @return array
     */
    public function fakePermisoModuloData($permisoModuloFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'Role_id' => $fake->randomDigitNotNull,
            'Modulo_id' => $fake->randomDigitNotNull,
            'write' => $fake->randomDigitNotNull,
            'delete' => $fake->randomDigitNotNull,
            'update' => $fake->randomDigitNotNull,
            'view' => $fake->randomDigitNotNull
        ], $permisoModuloFields);
    }
}
