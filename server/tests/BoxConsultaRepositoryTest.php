<?php

use App\Models\BoxConsulta;
use App\Repositories\BoxConsultaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BoxConsultaRepositoryTest extends TestCase
{
    use MakeBoxConsultaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var BoxConsultaRepository
     */
    protected $boxConsultaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->boxConsultaRepo = App::make(BoxConsultaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateBoxConsulta()
    {
        $boxConsulta = $this->fakeBoxConsultaData();
        $createdBoxConsulta = $this->boxConsultaRepo->create($boxConsulta);
        $createdBoxConsulta = $createdBoxConsulta->toArray();
        $this->assertArrayHasKey('id', $createdBoxConsulta);
        $this->assertNotNull($createdBoxConsulta['id'], 'Created BoxConsulta must have id specified');
        $this->assertNotNull(BoxConsulta::find($createdBoxConsulta['id']), 'BoxConsulta with given id must be in DB');
        $this->assertModelData($boxConsulta, $createdBoxConsulta);
    }

    /**
     * @test read
     */
    public function testReadBoxConsulta()
    {
        $boxConsulta = $this->makeBoxConsulta();
        $dbBoxConsulta = $this->boxConsultaRepo->find($boxConsulta->id);
        $dbBoxConsulta = $dbBoxConsulta->toArray();
        $this->assertModelData($boxConsulta->toArray(), $dbBoxConsulta);
    }

    /**
     * @test update
     */
    public function testUpdateBoxConsulta()
    {
        $boxConsulta = $this->makeBoxConsulta();
        $fakeBoxConsulta = $this->fakeBoxConsultaData();
        $updatedBoxConsulta = $this->boxConsultaRepo->update($fakeBoxConsulta, $boxConsulta->id);
        $this->assertModelData($fakeBoxConsulta, $updatedBoxConsulta->toArray());
        $dbBoxConsulta = $this->boxConsultaRepo->find($boxConsulta->id);
        $this->assertModelData($fakeBoxConsulta, $dbBoxConsulta->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteBoxConsulta()
    {
        $boxConsulta = $this->makeBoxConsulta();
        $resp = $this->boxConsultaRepo->delete($boxConsulta->id);
        $this->assertTrue($resp);
        $this->assertNull(BoxConsulta::find($boxConsulta->id), 'BoxConsulta should not exist in DB');
    }
}
