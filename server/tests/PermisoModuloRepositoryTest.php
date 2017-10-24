<?php

use App\Models\PermisoModulo;
use App\Repositories\PermisoModuloRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermisoModuloRepositoryTest extends TestCase
{
    use MakePermisoModuloTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var PermisoModuloRepository
     */
    protected $permisoModuloRepo;

    public function setUp()
    {
        parent::setUp();
        $this->permisoModuloRepo = App::make(PermisoModuloRepository::class);
    }

    /**
     * @test create
     */
    public function testCreatePermisoModulo()
    {
        $permisoModulo = $this->fakePermisoModuloData();
        $createdPermisoModulo = $this->permisoModuloRepo->create($permisoModulo);
        $createdPermisoModulo = $createdPermisoModulo->toArray();
        $this->assertArrayHasKey('id', $createdPermisoModulo);
        $this->assertNotNull($createdPermisoModulo['id'], 'Created PermisoModulo must have id specified');
        $this->assertNotNull(PermisoModulo::find($createdPermisoModulo['id']), 'PermisoModulo with given id must be in DB');
        $this->assertModelData($permisoModulo, $createdPermisoModulo);
    }

    /**
     * @test read
     */
    public function testReadPermisoModulo()
    {
        $permisoModulo = $this->makePermisoModulo();
        $dbPermisoModulo = $this->permisoModuloRepo->find($permisoModulo->id);
        $dbPermisoModulo = $dbPermisoModulo->toArray();
        $this->assertModelData($permisoModulo->toArray(), $dbPermisoModulo);
    }

    /**
     * @test update
     */
    public function testUpdatePermisoModulo()
    {
        $permisoModulo = $this->makePermisoModulo();
        $fakePermisoModulo = $this->fakePermisoModuloData();
        $updatedPermisoModulo = $this->permisoModuloRepo->update($fakePermisoModulo, $permisoModulo->id);
        $this->assertModelData($fakePermisoModulo, $updatedPermisoModulo->toArray());
        $dbPermisoModulo = $this->permisoModuloRepo->find($permisoModulo->id);
        $this->assertModelData($fakePermisoModulo, $dbPermisoModulo->toArray());
    }

    /**
     * @test delete
     */
    public function testDeletePermisoModulo()
    {
        $permisoModulo = $this->makePermisoModulo();
        $resp = $this->permisoModuloRepo->delete($permisoModulo->id);
        $this->assertTrue($resp);
        $this->assertNull(PermisoModulo::find($permisoModulo->id), 'PermisoModulo should not exist in DB');
    }
}
