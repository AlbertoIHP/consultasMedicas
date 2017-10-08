<?php

use App\Models\Comuna;
use App\Repositories\ComunaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ComunaRepositoryTest extends TestCase
{
    use MakeComunaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ComunaRepository
     */
    protected $comunaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->comunaRepo = App::make(ComunaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateComuna()
    {
        $comuna = $this->fakeComunaData();
        $createdComuna = $this->comunaRepo->create($comuna);
        $createdComuna = $createdComuna->toArray();
        $this->assertArrayHasKey('id', $createdComuna);
        $this->assertNotNull($createdComuna['id'], 'Created Comuna must have id specified');
        $this->assertNotNull(Comuna::find($createdComuna['id']), 'Comuna with given id must be in DB');
        $this->assertModelData($comuna, $createdComuna);
    }

    /**
     * @test read
     */
    public function testReadComuna()
    {
        $comuna = $this->makeComuna();
        $dbComuna = $this->comunaRepo->find($comuna->id);
        $dbComuna = $dbComuna->toArray();
        $this->assertModelData($comuna->toArray(), $dbComuna);
    }

    /**
     * @test update
     */
    public function testUpdateComuna()
    {
        $comuna = $this->makeComuna();
        $fakeComuna = $this->fakeComunaData();
        $updatedComuna = $this->comunaRepo->update($fakeComuna, $comuna->id);
        $this->assertModelData($fakeComuna, $updatedComuna->toArray());
        $dbComuna = $this->comunaRepo->find($comuna->id);
        $this->assertModelData($fakeComuna, $dbComuna->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteComuna()
    {
        $comuna = $this->makeComuna();
        $resp = $this->comunaRepo->delete($comuna->id);
        $this->assertTrue($resp);
        $this->assertNull(Comuna::find($comuna->id), 'Comuna should not exist in DB');
    }
}
