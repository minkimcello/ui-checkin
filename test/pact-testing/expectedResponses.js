const { somethingLike: like, uuid, boolean } = Pact.Matchers
export const expectedLoanBody = {
    loans: [
      {
        id: uuid("cf23adf0-61ba-4887-bf82-956c4aae2260"),
        userId : uuid("df7f4993-8c14-4a0f-ab63-93975ab01c76"),
        proxyUserId: uuid("346ad017-dac1-417d-9ed8-0ac7eeb886aa"),
        itemId : uuid("cb20f34f-b773-462f-a091-b233cc96b9e6"),
        item : {
          title: like("The Long Way to a Small, Angry Planet"),
          barcode: like("9676761472500"),
          status : {
            name: "Checked Out" //TODO put in options for this
          }
        },
        loanDate: like("2017-03-01T22:34:11Z"),
        dueDate: like("2017-04-01T22:34:11.000Z"),
        status: {
          name: "Open" //TODO put in options for this
        },
        location: {
          name: like("Main Library")
        },
        action: "checkedout", //TODO put in options for this
        renewalCount: like(1)
      }
    ],
    totalRecords: 1
    }
export const expectedPatronBody = 
{
  totalCharges: {
    amount: like(50.0),
    isoCurrencyCode: "USD" //TODO
  },
  totalChargesCount: like(1),
  totalLoans: like(1),
  totalHolds: like(1),
  charges: [
    {
      item : {
        instanceId : like("6e024cd5-c19a-4fe0-a2cd-64ce5814c694"),
        itemId : like("7d9dfe70-0158-489d-a7ed-2789eac277b3"),
        title : like("Some Book About Something"),
        author : like("Some Guy; Another Guy")
      },
      chargeAmount : {
        amount : like(50.0),
        isoCurrencyCode : "USD"
      },
      accrualDate : like("2018-01-31T00:00:01Z"),
      state : like("Paid Partially"),
      reason : like("damage - rebinding"),
      feeFineId : like("881c628b-e1c4-4711-b9d7-090af40f6a8f")
    }
  ],
  holds: [
    {
      requestId: like("8bbac557-d66f-4571-bbbf-47a107cc1589"),
      item: {
        instanceId: like("255f82f3-5b1b-4239-93e4-ec6acf03ad9d"),
        itemId: like("26670295-716a-4f84-8f65-2ef31707c017"),
        title: like("I Want to Hold Your Hand"),
        author: like("John Lennon; Paul McCartney")
      },
      requestDate: like("2018-06-02T08:16:30Z"),
      fulfillmentPreference: like("Hold Shelf"),
      status: like("Open - Not yet filled")
    }
  ],
  loans: [
    {
      id: like("9a171a89-baca-4f1a-b2c4-d7253854864e"),
      item: {
        instanceId: like("6e024cd5-c19a-4fe0-a2cd-64ce5814c694"),
        itemId: like("7d9dfe70-0158-489d-a7ed-2789eac277b3"),
        title: like("Some Book About Something"),
        author: like("Some Guy; Another Guy")
      },
      loanDate: like("2018-06-01T11:12:00Z"),
      dueDate: like("2525-01-01T11:12:00Z"),
      overdue: like(false)
    }
  ]
}
export const expectedUserBody = 
{
  users : [
    {
      id: uuid("5314b409-01d8-4146-860b-369af9ac2208"),
    }
  ]
  };