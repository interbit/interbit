const assert = require('assert')
const api = require('..')

describe('module exports expected components', () => {
  it('exports BlockExplorer component', () => {
    assert.ok(api.BlockExplorer)
  })

  it('exports Covenant component', () => {
    assert.ok(api.Covenant)
  })

  it('exports LinkedCovenant component', () => {
    assert.ok(api.LinkedCovenant)
  })

  it('exports NotFound component', () => {
    assert.ok(api.NotFound)
  })

  it('exports Markdown component', () => {
    assert.ok(api.Markdown)
  })

  it('exports Logo component', () => {
    assert.ok(api.Logo)
  })

  it('exports IBIcon component', () => {
    assert.ok(api.IBIcon)
  })

  it('exports IBWordmark component', () => {
    assert.ok(api.IBWordmark)
  })

  it('exports Footer component', () => {
    assert.ok(api.Footer)
  })

  it('exports Header component', () => {
    assert.ok(api.Header)
  })

  it('exports Sidebar component', () => {
    assert.ok(api.Sidebar)
  })

  it('exports Card component', () => {
    assert.ok(api.Card)
  })

  it('exports ConnectingTo component', () => {
    assert.ok(api.ConnectingTo)
  })

  it('exports ContentBox component', () => {
    assert.ok(api.ContentBox)
  })

  it('exports ContentBar component', () => {
    assert.ok(api.ContentBar)
  })

  it('exports ContentBarDefault component', () => {
    assert.ok(api.ContentBarDefault)
  })

  it('exports Divider component', () => {
    assert.ok(api.Divider)
  })

  it('exports Quote component', () => {
    assert.ok(api.Quote)
  })

  it('exports SidebarList component', () => {
    assert.ok(api.SidebarList)
  })

  it('exports TitledList component', () => {
    assert.ok(api.TitledList)
  })

  it('exports ButtonLink component', () => {
    assert.ok(api.ButtonLink)
  })

  it('exports CallToAction component', () => {
    assert.ok(api.CallToAction)
  })

  it('exports IconButton component', () => {
    assert.ok(api.IconButton)
  })

  it('exports LaunchPad component', () => {
    assert.ok(api.LaunchPad)
  })

  it('exports LaunchPadRow component', () => {
    assert.ok(api.LaunchPadRow)
  })

  it('exports LinkBar component', () => {
    assert.ok(api.LinkBar)
  })

  it('exports LinkBarSlack component', () => {
    assert.ok(api.LinkBarSlack)
  })

  it('exports LinkWrapper component', () => {
    assert.ok(api.LinkWrapper)
  })

  it('exports ModalWrapper component', () => {
    assert.ok(api.ModalWrapper)
  })

  it('exports renderInput', () => {
    assert.ok(api.renderInput)
  })
})
