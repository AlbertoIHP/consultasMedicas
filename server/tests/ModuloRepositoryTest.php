<?php

use App\Models\Modulo;
use App\Repositories\ModuloRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ModuloRepositoryTest extends TestCase
{
    use MakeModuloTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ModuloRepository
     */
    protected $moduloRepo;

    public function setUp()
    {
        parent::setUp();
        $this->moduloRepo = App::make(ModuloRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateModulo()
    {
        $modulo = $this->fakeModuloData();
        $createdModulo = $this->moduloRepo->create($modulo);
        $createdModulo = $createdModulo->toArray();
        $this->assertArrayHasKey('id', $createdModulo);
        $this->assertNotNull($createdModulo['id'], 'Created Modulo must have id specified');
        $this->assertNotNull(Modulo::find($createdModulo['id']), 'Modulo with given id must be in DB');
        $this->assertModelData($modulo, $createdModulo);
    }

    /**
     * @test read
     */
    public function testReadModulo()
    {
        $modulo = $this->makeModulo();
        $dbModulo = $this->moduloRepo->find($modulo->id);
        $dbModulo = $dbModulo->toArray();
        $this->assertModelData($modulo->toArray(), $dbModulo);
    }

    /**
     * @test update
     */
    public function testUpdateModulo()
    {
        $modulo = $this->makeModulo();
        $fakeModulo = $this->fakeModuloData();
        $updatedModulo = $this->moduloRepo->update($fakeModulo, $modulo->id);
        $this->assertModelData($fakeModulo, $updatedModulo->toArray());
        $dbModulo = $this->moduloRepo->find($modulo->id);
        $this->assertModelData($fakeModulo, $dbModulo->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteModulo()
    {
        $modulo = $this->makeModulo();
        $resp = $this->moduloRepo->delete($modulo->id);
        $this->assertTrue($resp);
        $this->assertNull(Modulo::find($modulo->id), 'Modulo should not exist in DB');
    }
}
