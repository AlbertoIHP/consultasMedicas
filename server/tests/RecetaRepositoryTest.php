<?php

use App\Models\Receta;
use App\Repositories\RecetaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RecetaRepositoryTest extends TestCase
{
    use MakeRecetaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var RecetaRepository
     */
    protected $recetaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->recetaRepo = App::make(RecetaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateReceta()
    {
        $receta = $this->fakeRecetaData();
        $createdReceta = $this->recetaRepo->create($receta);
        $createdReceta = $createdReceta->toArray();
        $this->assertArrayHasKey('id', $createdReceta);
        $this->assertNotNull($createdReceta['id'], 'Created Receta must have id specified');
        $this->assertNotNull(Receta::find($createdReceta['id']), 'Receta with given id must be in DB');
        $this->assertModelData($receta, $createdReceta);
    }

    /**
     * @test read
     */
    public function testReadReceta()
    {
        $receta = $this->makeReceta();
        $dbReceta = $this->recetaRepo->find($receta->id);
        $dbReceta = $dbReceta->toArray();
        $this->assertModelData($receta->toArray(), $dbReceta);
    }

    /**
     * @test update
     */
    public function testUpdateReceta()
    {
        $receta = $this->makeReceta();
        $fakeReceta = $this->fakeRecetaData();
        $updatedReceta = $this->recetaRepo->update($fakeReceta, $receta->id);
        $this->assertModelData($fakeReceta, $updatedReceta->toArray());
        $dbReceta = $this->recetaRepo->find($receta->id);
        $this->assertModelData($fakeReceta, $dbReceta->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteReceta()
    {
        $receta = $this->makeReceta();
        $resp = $this->recetaRepo->delete($receta->id);
        $this->assertTrue($resp);
        $this->assertNull(Receta::find($receta->id), 'Receta should not exist in DB');
    }
}
