<?php

use App\Models\Medico;
use App\Repositories\MedicoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicoRepositoryTest extends TestCase
{
    use MakeMedicoTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var MedicoRepository
     */
    protected $medicoRepo;

    public function setUp()
    {
        parent::setUp();
        $this->medicoRepo = App::make(MedicoRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateMedico()
    {
        $medico = $this->fakeMedicoData();
        $createdMedico = $this->medicoRepo->create($medico);
        $createdMedico = $createdMedico->toArray();
        $this->assertArrayHasKey('id', $createdMedico);
        $this->assertNotNull($createdMedico['id'], 'Created Medico must have id specified');
        $this->assertNotNull(Medico::find($createdMedico['id']), 'Medico with given id must be in DB');
        $this->assertModelData($medico, $createdMedico);
    }

    /**
     * @test read
     */
    public function testReadMedico()
    {
        $medico = $this->makeMedico();
        $dbMedico = $this->medicoRepo->find($medico->id);
        $dbMedico = $dbMedico->toArray();
        $this->assertModelData($medico->toArray(), $dbMedico);
    }

    /**
     * @test update
     */
    public function testUpdateMedico()
    {
        $medico = $this->makeMedico();
        $fakeMedico = $this->fakeMedicoData();
        $updatedMedico = $this->medicoRepo->update($fakeMedico, $medico->id);
        $this->assertModelData($fakeMedico, $updatedMedico->toArray());
        $dbMedico = $this->medicoRepo->find($medico->id);
        $this->assertModelData($fakeMedico, $dbMedico->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteMedico()
    {
        $medico = $this->makeMedico();
        $resp = $this->medicoRepo->delete($medico->id);
        $this->assertTrue($resp);
        $this->assertNull(Medico::find($medico->id), 'Medico should not exist in DB');
    }
}
