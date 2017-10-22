<?php

use App\Models\Atention;
use App\Repositories\AtentionRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AtentionRepositoryTest extends TestCase
{
    use MakeAtentionTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AtentionRepository
     */
    protected $atentionRepo;

    public function setUp()
    {
        parent::setUp();
        $this->atentionRepo = App::make(AtentionRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateAtention()
    {
        $atention = $this->fakeAtentionData();
        $createdAtention = $this->atentionRepo->create($atention);
        $createdAtention = $createdAtention->toArray();
        $this->assertArrayHasKey('id', $createdAtention);
        $this->assertNotNull($createdAtention['id'], 'Created Atention must have id specified');
        $this->assertNotNull(Atention::find($createdAtention['id']), 'Atention with given id must be in DB');
        $this->assertModelData($atention, $createdAtention);
    }

    /**
     * @test read
     */
    public function testReadAtention()
    {
        $atention = $this->makeAtention();
        $dbAtention = $this->atentionRepo->find($atention->id);
        $dbAtention = $dbAtention->toArray();
        $this->assertModelData($atention->toArray(), $dbAtention);
    }

    /**
     * @test update
     */
    public function testUpdateAtention()
    {
        $atention = $this->makeAtention();
        $fakeAtention = $this->fakeAtentionData();
        $updatedAtention = $this->atentionRepo->update($fakeAtention, $atention->id);
        $this->assertModelData($fakeAtention, $updatedAtention->toArray());
        $dbAtention = $this->atentionRepo->find($atention->id);
        $this->assertModelData($fakeAtention, $dbAtention->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteAtention()
    {
        $atention = $this->makeAtention();
        $resp = $this->atentionRepo->delete($atention->id);
        $this->assertTrue($resp);
        $this->assertNull(Atention::find($atention->id), 'Atention should not exist in DB');
    }
}
