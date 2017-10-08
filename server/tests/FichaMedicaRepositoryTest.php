<?php

use App\Models\FichaMedica;
use App\Repositories\FichaMedicaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FichaMedicaRepositoryTest extends TestCase
{
    use MakeFichaMedicaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var FichaMedicaRepository
     */
    protected $fichaMedicaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->fichaMedicaRepo = App::make(FichaMedicaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateFichaMedica()
    {
        $fichaMedica = $this->fakeFichaMedicaData();
        $createdFichaMedica = $this->fichaMedicaRepo->create($fichaMedica);
        $createdFichaMedica = $createdFichaMedica->toArray();
        $this->assertArrayHasKey('id', $createdFichaMedica);
        $this->assertNotNull($createdFichaMedica['id'], 'Created FichaMedica must have id specified');
        $this->assertNotNull(FichaMedica::find($createdFichaMedica['id']), 'FichaMedica with given id must be in DB');
        $this->assertModelData($fichaMedica, $createdFichaMedica);
    }

    /**
     * @test read
     */
    public function testReadFichaMedica()
    {
        $fichaMedica = $this->makeFichaMedica();
        $dbFichaMedica = $this->fichaMedicaRepo->find($fichaMedica->id);
        $dbFichaMedica = $dbFichaMedica->toArray();
        $this->assertModelData($fichaMedica->toArray(), $dbFichaMedica);
    }

    /**
     * @test update
     */
    public function testUpdateFichaMedica()
    {
        $fichaMedica = $this->makeFichaMedica();
        $fakeFichaMedica = $this->fakeFichaMedicaData();
        $updatedFichaMedica = $this->fichaMedicaRepo->update($fakeFichaMedica, $fichaMedica->id);
        $this->assertModelData($fakeFichaMedica, $updatedFichaMedica->toArray());
        $dbFichaMedica = $this->fichaMedicaRepo->find($fichaMedica->id);
        $this->assertModelData($fakeFichaMedica, $dbFichaMedica->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteFichaMedica()
    {
        $fichaMedica = $this->makeFichaMedica();
        $resp = $this->fichaMedicaRepo->delete($fichaMedica->id);
        $this->assertTrue($resp);
        $this->assertNull(FichaMedica::find($fichaMedica->id), 'FichaMedica should not exist in DB');
    }
}
