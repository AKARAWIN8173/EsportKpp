(() => {
  const header = document.getElementById('site-header')
  const menuButton = document.getElementById('menu-toggle')
  const menu = document.getElementById('main-nav')

  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 0)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
  }
  menuButton?.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open')
    menu.classList.toggle('is-open', open)
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู')
  })
  menu?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menu.classList.remove('is-open')
      menuButton?.setAttribute('aria-expanded', 'false')
      menuButton?.setAttribute('aria-label', 'เปิดเมนู')
    }
  })

  const contactForm = document.getElementById('contact-form')
  contactForm?.addEventListener('submit', event => {
    event.preventDefault()
    if (!contactForm.reportValidity()) return
    const data = new FormData(contactForm)
    const subject = String(data.get('subject') || '').trim() || 'ติดต่อสมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร'
    const body = [
      'ชื่อ: ' + String(data.get('name') || '').trim(),
      'อีเมล: ' + String(data.get('email') || '').trim(),
      '',
      String(data.get('message') || '').trim(),
    ].join('\r\n')
    window.location.href = 'mailto:kppesports@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
  })

  const form = document.getElementById('registration-form')
  if (!form) return
  const errorBox = document.getElementById('form-errors')
  const status = document.getElementById('registration-status')
  const consent = document.getElementById('pdpa-consent')
  const indicator = document.querySelector('.pdpa-indicator')
  const submitButton = form.querySelector('.registration-submit')
  const substituteButton = document.getElementById('toggle-substitute')
  const substituteList = document.getElementById('substitute-players')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let consentTimer
  let substituteTimer

  submitButton.disabled = !consent.checked

  const updateDepartment = row => {
    const year = row.querySelector('select[id^="player-year-"]')
    const department = row.querySelector('select[id^="player-department-"]')
    if (!year || !department) return
    const isSecondary = /^ม\.[1-6]$/.test(year.value)
    department.closest('label').classList.toggle('field-disabled', isSecondary)
    department.required = !isSecondary
    department.disabled = isSecondary
    if (isSecondary) {
      department.value = ''
      department.removeAttribute('aria-invalid')
    }
  }

  form.querySelectorAll('.player-row').forEach(updateDepartment)
  form.addEventListener('change', event => {
    if (event.target.matches('select[id^="player-year-"]')) updateDepartment(event.target.closest('.player-row'))
  })

  substituteButton.addEventListener('click', () => {
    clearTimeout(substituteTimer)
    const row = substituteList.querySelector('.player-row')
    const showing = substituteButton.getAttribute('aria-expanded') === 'true'
    row.classList.remove('player-enter', 'player-exit')
    substituteButton.setAttribute('aria-expanded', String(!showing))
    substituteButton.textContent = showing ? '+ เพิ่มตัวสำรอง' : 'ลบตัวสำรอง'
    substituteButton.classList.toggle('roster-action-add', showing)
    substituteButton.classList.toggle('roster-action-remove', !showing)
    if (showing) {
      row.disabled = true
      const hide = () => {
        substituteList.hidden = true
        substituteList.querySelectorAll('input, select').forEach(input => { input.value = ''; input.removeAttribute('aria-invalid') })
        updateDepartment(row)
        row.classList.remove('player-exit')
      }
      if (reducedMotion.matches) hide()
      else {
        row.classList.add('player-exit')
        substituteTimer = window.setTimeout(hide, 700)
      }
    } else {
      substituteList.hidden = false
      row.disabled = false
      if (!reducedMotion.matches) {
        row.classList.add('player-enter')
        substituteTimer = window.setTimeout(() => row.classList.remove('player-enter'), 700)
      }
      row.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' })
      window.setTimeout(() => row.querySelector('input')?.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 350)
    }
    status.hidden = true
  })

  consent.addEventListener('change', () => {
    clearTimeout(consentTimer)
    submitButton.disabled = !consent.checked
    indicator.classList.remove('is-loading', 'is-done')
    if (consent.checked) {
      indicator.classList.add('is-loading')
      consentTimer = window.setTimeout(() => {
        indicator.classList.remove('is-loading')
        indicator.classList.add('is-done')
      }, 650)
    }
    status.hidden = true
  })

  form.addEventListener('input', event => {
    if (event.target.matches('input, select')) event.target.removeAttribute('aria-invalid')
    status.hidden = true
  })
  form.addEventListener('change', event => {
    if (event.target.type !== 'file') return
    const file = event.target.files[0]
    const allowed = ['image/png', 'image/jpeg', 'image/webp']
    const maxBytes = Number(event.target.dataset.maxBytes || 0)
    const error = file && !allowed.includes(file.type)
      ? 'กรุณาเลือกไฟล์ PNG, JPG หรือ WebP'
      : file && maxBytes && file.size > maxBytes
        ? 'ไฟล์ต้องมีขนาดไม่เกิน 1 GB'
        : ''
    event.target.setCustomValidity(error)
    event.target.setAttribute('aria-invalid', String(Boolean(error)))
  })

  form.addEventListener('submit', async event => {
    event.preventDefault()
    if (!consent.checked || submitButton.disabled) return
    const invalid = [...form.querySelectorAll('input, select')].filter(input => !input.checkValidity())
    if (invalid.length) {
      errorBox.hidden = false
      errorBox.replaceChildren()
      const heading = document.createElement('strong')
      heading.textContent = 'กรุณาตรวจ ' + invalid.length + ' ช่อง'
      const list = document.createElement('ul')
      invalid.forEach(input => {
        input.setAttribute('aria-invalid', 'true')
        const item = document.createElement('li')
        const link = document.createElement('a')
        link.href = '#' + input.id
        const fieldLabel = input.closest('label')?.childNodes[0]?.textContent.trim() || input.name
        const playerLabel = input.closest('.player-row')?.querySelector('legend')?.textContent.trim()
        link.textContent = playerLabel ? playerLabel + ' · ' + fieldLabel : fieldLabel
        link.addEventListener('click', e => { e.preventDefault(); input.focus() })
        item.append(link)
        list.append(item)
      })
      errorBox.append(heading, list)
      invalid[0].focus()
      status.hidden = true
      return
    }
    errorBox.hidden = true
    status.hidden = true
    submitButton.disabled = true
    submitButton.textContent = 'กำลังส่งข้อมูล...'

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      const result = await response.json()

      if (!response.ok) {
        errorBox.hidden = false
        errorBox.replaceChildren()
        const heading = document.createElement('strong')
        heading.textContent = response.status === 422 ? 'กรุณาตรวจข้อมูลในแบบฟอร์ม' : 'ส่งแบบฟอร์มไม่สำเร็จ'
        errorBox.append(heading)

        if (response.status === 422 && result.errors) {
          const list = document.createElement('ul')
          Object.entries(result.errors).forEach(([key, messages]) => {
            const name = key.replace(/^players\.(\d+)\.([a-z_]+)$/, 'players[$1][$2]')
            const input = [...form.elements].find(element => element.name === name)
            input?.setAttribute('aria-invalid', 'true')
            messages.forEach(message => {
              const item = document.createElement('li')
              item.textContent = message
              list.append(item)
            })
          })
          errorBox.append(list)
        } else {
          const message = document.createElement('p')
          message.textContent = response.status === 413
            ? 'ไฟล์มีขนาดเกินที่เซิร์ฟเวอร์รับได้'
            : 'กรุณาลองใหม่อีกครั้ง หากยังไม่สำเร็จให้ติดต่อผู้จัดการแข่งขัน'
          errorBox.append(message)
        }
        errorBox.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' })
        return
      }

      clearTimeout(substituteTimer)
      clearTimeout(consentTimer)
      form.reset()
      consent.checked = false
      indicator.classList.remove('is-loading', 'is-done')
      const reserveRow = substituteList.querySelector('.player-row')
      reserveRow.disabled = true
      reserveRow.classList.remove('player-enter', 'player-exit')
      substituteList.hidden = true
      substituteButton.setAttribute('aria-expanded', 'false')
      substituteButton.textContent = '+ เพิ่มตัวสำรอง'
      substituteButton.classList.add('roster-action-add')
      substituteButton.classList.remove('roster-action-remove')
      form.querySelectorAll('.player-row').forEach(updateDepartment)
      errorBox.hidden = true
      status.textContent = '✓ ' + result.message
      status.hidden = false
      status.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' })
    } catch {
      errorBox.hidden = false
      errorBox.textContent = 'ส่งแบบฟอร์มไม่สำเร็จ กรุณาตรวจการเชื่อมต่อแล้วลองใหม่'
      errorBox.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' })
    } finally {
      submitButton.textContent = 'ส่งแบบฟอร์ม'
      submitButton.disabled = !consent.checked
    }
  })

  const page = document.querySelector('.register-page')
  const shapes = [...document.querySelectorAll('.register-floating-shapes .shape')]
  if (page && shapes.length && window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    let frame = 0
    let point = null
    const update = () => {
      const rect = page.getBoundingClientRect()
      shapes.forEach(shape => {
        const x = rect.left + rect.width * Number(shape.dataset.x) / 100 + Number(shape.dataset.size) / 2
        const y = rect.top + rect.height * Number(shape.dataset.y) / 100 + Number(shape.dataset.size) / 2
        const dx = x - point.x
        const dy = y - point.y
        const distance = Math.hypot(dx, dy)
        const push = 72 * Math.max(0, 1 - distance / 190) ** 2
        shape.style.translate = distance ? (dx / distance * push).toFixed(1) + 'px ' + (dy / distance * push).toFixed(1) + 'px' : '0 0'
      })
      frame = 0
    }
    page.addEventListener('pointermove', event => {
      point = { x: event.clientX, y: event.clientY }
      if (!frame) frame = requestAnimationFrame(update)
    }, { passive: true })
    page.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      shapes.forEach(shape => { shape.style.translate = '0 0' })
    })
  }
})()
