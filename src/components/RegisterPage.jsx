import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Check, CheckCircle2, Plus, Trash2 } from 'lucide-react'

const fieldClass = 'box-border h-12 min-w-0 w-full border border-[#565c73] bg-[#08090e] px-3 py-2 text-base caret-[#85a0ff] hover:border-[#829aff]'
const labelClass = 'flex min-w-0 flex-col items-start gap-2 self-start font-semibold'
const secondaryButton = 'button button-outline cursor-pointer'

const floatingShapes = [
  ['triangle', 4, 3, 54, 18, -26, 12, 11, -3],
  ['circle', 90, 8, 42, -24, 22, -9, 15, -8],
  ['plus', 2, 15, 30, 12, 34, 18, 9, -5],
  ['square', 94, 20, 58, -30, -18, -16, 13, -7],
  ['circle', 8, 26, 38, 22, -38, 8, 17, -11],
  ['triangle', 88, 31, 64, -18, 30, -13, 12, -2],
  ['square', 3, 37, 35, 30, 18, 20, 10, -6],
  ['plus', 95, 42, 40, -16, -32, -20, 16, -9],
  ['triangle', 10, 48, 48, 20, 24, 15, 14, -4],
  ['circle', 87, 53, 33, -28, -22, -12, 11, -8],
  ['plus', 4, 58, 55, 15, -35, 25, 18, -12],
  ['square', 93, 63, 37, -20, 27, -18, 12, -5],
  ['circle', 8, 69, 60, 24, 19, 10, 15, -3],
  ['triangle', 89, 74, 43, -27, -31, -21, 10, -7],
  ['square', 3, 79, 52, 18, 34, 16, 17, -10],
  ['plus', 95, 84, 31, -24, -20, -14, 13, -4],
  ['triangle', 11, 89, 36, 26, -28, 23, 11, -6],
  ['circle', 86, 93, 50, -17, 25, -19, 16, -13],
  ['plus', 5, 97, 38, 20, -16, 13, 12, -8],
  ['square', 94, 98, 44, -25, -32, -15, 14, -2],
]

function FloatingShapes() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const page = container?.parentElement
    const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover)')
    if (!page || !motionAllowed.matches) return

    const shapes = Array.from(container.querySelectorAll('.shape'))
    let frame = 0
    let pointerX = 0
    let pointerY = 0

    const update = () => {
      const pageRect = page.getBoundingClientRect()
      const radius = 190
      shapes.forEach((shape, index) => {
        const [, x, y, size] = floatingShapes[index]
        const centerX = pageRect.left + pageRect.width * x / 100 + size / 2
        const centerY = pageRect.top + pageRect.height * y / 100 + size / 2
        const deltaX = centerX - pointerX
        const deltaY = centerY - pointerY
        const distance = Math.hypot(deltaX, deltaY)
        const proximity = Math.max(0, 1 - distance / radius)
        const push = 72 * proximity * proximity
        const directionX = distance > 0 ? deltaX / distance : 1
        const directionY = distance > 0 ? deltaY / distance : 0
        shape.style.translate = `${(directionX * push).toFixed(1)}px ${(directionY * push).toFixed(1)}px`
      })
      frame = 0
    }
    const onMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      shapes.forEach(shape => { shape.style.translate = '0 0' })
    }

    page.addEventListener('pointermove', onMove, { passive: true })
    page.addEventListener('pointerleave', onLeave)
    return () => {
      page.removeEventListener('pointermove', onMove)
      page.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [])

  return (
    <div ref={containerRef} className="register-floating-shapes" aria-hidden="true">
      {floatingShapes.map(([type, x, y, size, dx, dy, rotation, duration, delay], index) => (
        <svg
          key={index}
          className={'shape shape-' + type}
          viewBox="0 0 64 64"
          style={{ '--x': x + '%', '--y': y + '%', '--size': size + 'px', '--dx': dx + 'px', '--dy': dy + 'px', '--rotation': rotation + 'deg', '--duration': duration + 's', '--delay': delay + 's' }}
        >
          {type === 'circle' && <circle cx="32" cy="32" r="25" />}
          {type === 'square' && <rect x="9" y="9" width="46" height="46" />}
          {type === 'triangle' && <path d="M32 8 59 55H5Z" />}
          {type === 'plus' && <path d="M32 8v48M8 32h48" />}
        </svg>
      ))}
    </div>
  )
}

function RequiredMark() {
  return <span className="text-red-400" aria-hidden="true"> *</span>
}

function errorAttributes(name, error, hintId) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [hintId, error && name + '-error'].filter(Boolean).join(' ') || undefined,
  }
}

function FieldError({ name, error }) {
  return error && <p id={name + '-error'} className="text-sm font-normal text-red-300">{error.message}</p>
}

function TextField({ name, label, error, hint, ...inputProps }) {
  const hintId = hint ? name + '-hint' : undefined

  return (
    <div className={labelClass}>
      <label htmlFor={name}>{label}<RequiredMark /></label>
      <input
        id={name}
        name={name}
        className={fieldClass + ' registration-text-field aria-invalid:border-red-400'}
        required
        pattern={'.*\\S.*'}
        data-required-message={'กรุณากรอก' + label}
        {...inputProps}
        {...errorAttributes(name, error, hintId)}
      />
      {hint && <p id={hintId} className="text-sm font-normal text-[var(--muted)]">{hint}</p>}
      <FieldError name={name} error={error} />
    </div>
  )
}

function ImageField({ name, label, recommendedSize, guidance, error, required = false }) {
  return (
    <div className={labelClass}>
      <label htmlFor={name}>{label}{required && <RequiredMark />}</label>
      <input
        id={name}
        className={fieldClass + ' aria-invalid:border-red-400 file:mr-3 file:cursor-pointer file:border-0 file:bg-[#273660] file:px-3 file:py-1 file:font-semibold file:text-white'}
        type="file"
        name={name}
        {...errorAttributes(name, error, name + '-size-hint')}
        accept="image/png,image/jpeg,image/webp"
        required={required}
        data-required-message={'กรุณาเลือกไฟล์' + label}
        onChange={(event) => {
          const input = event.currentTarget
          const file = input.files[0]
          input.setCustomValidity(file && !['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
            ? 'กรุณาเลือกไฟล์ PNG, JPG หรือ WebP'
            : '')
        }}
      />
      <span id={name + '-size-hint'} className="text-sm font-normal text-[var(--muted)]">
        <strong>ขนาดแนะนำ:</strong> {recommendedSize}{guidance && ' · ' + guidance} · รองรับ PNG, JPG, WebP
      </span>
      <FieldError name={name} error={error} />
    </div>
  )
}

function AddPlayerButton({ name, onClick, children }) {
  return (
    <button type="button" name={name} className="button roster-action roster-action-add cursor-pointer justify-self-start" onClick={onClick}>
      <Plus size={18} aria-hidden="true" /> {children}
    </button>
  )
}

function PlayerRow({ playerId, label, errors, collapsed, onToggle, onRemove, addButton }) {
  const rowRef = useRef(null)
  const [summary, setSummary] = useState(null)
  const [entering, setEntering] = useState(playerId > 0)
  const [removing, setRemoving] = useState(false)
  const toggleName = 'toggle-player-' + playerId
  const fieldsId = 'player-fields-' + playerId

  function updateSummary() {
    const fields = rowRef.current.elements
    setSummary(Array.from(fields).every(input => !input.willValidate || input.validity.valid)
      ? [fields.namedItem('player-name-' + playerId).value.trim(), fields.namedItem('game-name-' + playerId).value.trim()]
      : null)
  }

  return (
    <fieldset
      ref={rowRef}
      data-player-id={playerId}
      disabled={removing}
      onChange={updateSummary}
      onAnimationEnd={(event) => {
        if (removing && event.target === event.currentTarget) onRemove()
      }}
      className={'min-w-0 border-t border-[var(--line)]' + (removing ? ' player-form-exit' : entering ? ' player-form-reveal' : '')}
    >
      <legend className="pr-3 text-base font-bold text-blue-200">{label}</legend>
      {collapsed && summary && (
        <p className="pt-3 text-sm break-words text-blue-100">{summary.join(' · ')}</p>
      )}
      <div id={fieldsId} hidden={collapsed}>
        <div className="player-form-fields grid gap-4 pt-7 sm:grid-cols-2">
          <TextField name={'player-name-' + playerId} label="ชื่อผู้เล่น" hint="กรอกชื่อ-สกุล" error={errors['player-name-' + playerId]} />
          <TextField name={'player-name-en-' + playerId} label="ชื่อผู้เล่นภาษาอังกฤษ" hint="ตัวอย่าง: Somchai Jaidee" spellCheck={false} error={errors['player-name-en-' + playerId]} />
          <TextField name={'game-name-' + playerId} label="ชื่อในเกม" error={errors['game-name-' + playerId]} />
          <ImageField name={'player-photo-' + playerId} label="ภาพผู้เล่น" recommendedSize="1000 x 1000 px" guidance="รูปถ่ายครึ่งตัวบน" error={errors['player-photo-' + playerId]} />
        </div>
      </div>
      {(summary || collapsed) && (
        <button type="button" name={toggleName} className={secondaryButton + ' mt-3'} aria-expanded={!collapsed} aria-controls={fieldsId} onClick={() => onToggle(playerId, !collapsed)}>
          {collapsed ? 'แก้ไข' : 'ย่อข้อมูล'}{label}
        </button>
      )}
      {(onRemove || addButton) && (
        <div className="player-form-actions mt-4 flex flex-wrap items-center gap-2" onAnimationEnd={(event) => {
          if (!removing && event.target === event.currentTarget) setEntering(false)
        }}>
          {onRemove && (
            <button type="button" className="button roster-action roster-action-remove cursor-pointer" onClick={() => setRemoving(true)} aria-label={'ลบ' + label}>
              <Trash2 size={16} aria-hidden="true" /> ลบรายการ
            </button>
          )}
          {addButton}
        </div>
      )}
    </fieldset>
  )
}

function getFieldError(input) {
  let message
  if (!input.validity.valid) {
    message = input.validity.customError ? input.validationMessage : input.dataset.requiredMessage
  } else if (input.name === 'phone' && !/^\+?[0-9]{9,15}$/.test(input.value.replace(/[\s-]/g, ''))) {
    message = 'กรอกเบอร์โทรเป็นตัวเลข 9–15 หลัก ขึ้นต้นด้วย + ได้'
  }
  if (!message) return null

  const playerRow = input.closest('[data-player-id]')
  return {
    message,
    label: input.dataset.errorLabel || input.labels[0].textContent.replace(/\s*\*$/, ''),
    playerId: playerRow ? Number(playerRow.dataset.playerId) : null,
  }
}

export default function RegisterPage() {
  const [players, setPlayers] = useState([0])
  const [substitutes, setSubstitutes] = useState([])
  const [checked, setChecked] = useState(false)
  const [pdpaVisual, setPdpaVisual] = useState('idle')
  const [errors, setErrors] = useState({})
  const [collapsedPlayers, setCollapsedPlayers] = useState([])
  const nextPlayerId = useRef(1)
  const formRef = useRef(null)
  const pendingFocus = useRef(null)
  const centerNewPlayer = useRef(false)
  const returningButtons = useRef(new Map())
  const pdpaTimer = useRef(null)

  useEffect(() => () => clearTimeout(pdpaTimer.current), [])

  const updatePdpaConsent = (event) => {
    clearTimeout(pdpaTimer.current)
    if (!event.target.checked) {
      setPdpaVisual('idle')
      return
    }
    setPdpaVisual('loading')
    pdpaTimer.current = setTimeout(() => setPdpaVisual('done'), 650)
  }

  useLayoutEffect(() => {
    const controls = formRef.current.elements
    const field = pendingFocus.current ? controls.namedItem(pendingFocus.current) : null
    const isButtonReturning = returningButtons.current.size > 0
    for (const [name, previous] of returningButtons.current) {
      const button = controls.namedItem(name)
      if (!button || !previous) continue

      const current = button.getBoundingClientRect()
      const x = previous.left - current.left
      const y = previous.top - current.top
      if (x || y) {
        const movement = button.animate(
          [{ transform: `translate(${x}px, ${y}px)` }, { transform: 'translate(0, 0)' }],
          { duration: 380, easing: 'cubic-bezier(.22, .72, .22, 1)' },
        )
        movement.onfinish = () => {
          if (field && document.activeElement === field) field.scrollIntoView({ block: 'nearest' })
        }
      }
    }
    returningButtons.current.clear()

    if (!pendingFocus.current) return
    if (centerNewPlayer.current) {
      field?.focus({ preventScroll: true })
      field?.scrollIntoView({ block: 'center' })
    } else {
      field?.focus({ preventScroll: isButtonReturning })
    }
    pendingFocus.current = null
    centerNewPlayer.current = false
  })

  function addPlayer(setRoster) {
    const id = nextPlayerId.current++
    pendingFocus.current = 'player-name-' + id
    centerNewPlayer.current = true
    setRoster(roster => [...roster, id])
    setChecked(false)
  }

  function removePlayer(roster, setRoster, index, addButtonName) {
    const id = roster[index]
    if (index === roster.length - 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const button = formRef.current.elements.namedItem(addButtonName)
      if (button?.animate) returningButtons.current.set(addButtonName, button.getBoundingClientRect())
    }
    const adjacentPlayer = roster[index + 1] ?? roster[index - 1]
    pendingFocus.current = adjacentPlayer === undefined ? addButtonName
      : (collapsedPlayers.includes(adjacentPlayer) ? 'toggle-player-' : 'player-name-') + adjacentPlayer
    setRoster(current => current.filter(playerId => playerId !== id))
    setErrors(current => Object.fromEntries(Object.entries(current).filter(([name]) => !name.endsWith('-' + id))))
    setCollapsedPlayers(current => current.filter(playerId => playerId !== id))
    setChecked(false)
  }

  function updateField(event) {
    const input = event.target
    setChecked(false)
    if (!errors[input.name]) return

    const nextErrors = { ...errors }
    const error = getFieldError(input)
    if (error) nextErrors[input.name] = error
    else delete nextErrors[input.name]
    setErrors(nextErrors)
  }

  function checkRegistration(event) {
    event.preventDefault()
    const invalidFields = []
    for (const input of event.currentTarget.elements) {
      if (!input.willValidate) continue
      const error = getFieldError(input)
      if (error) invalidFields.push([input.name, error])
    }
    const invalidPlayerIds = new Set(invalidFields.map(([, error]) => error.playerId))
    setCollapsedPlayers(current => current.filter(id => !invalidPlayerIds.has(id)))
    pendingFocus.current = invalidFields[0]?.[0]
    setErrors(Object.fromEntries(invalidFields))
    setChecked(invalidFields.length === 0)
  }

  function togglePlayer(id, collapse) {
    pendingFocus.current = (collapse ? 'toggle-player-' : 'player-name-') + id
    setCollapsedPlayers(current => collapse ? [...current, id] : current.filter(playerId => playerId !== id))
  }

  const errorEntries = Object.entries(errors)
  const addMainButton = <AddPlayerButton name="add-player" onClick={() => addPlayer(setPlayers)}>เพิ่มผู้เล่นหลัก</AddPlayerButton>
  const addSubstituteButton = <AddPlayerButton name="add-substitute" onClick={() => addPlayer(setSubstitutes)}>เพิ่มตัวสำรอง</AddPlayerButton>
  const playerLabels = new Map([
    ...players.map((id, index) => [id, 'ผู้เล่นหลัก ' + (index + 1)]),
    ...substitutes.map((id, index) => [id, 'ตัวสำรอง ' + (index + 1)]),
  ])

  return (
    <main className="register-page content-section" aria-labelledby="register-title">
      <FloatingShapes />
      <div className="wrap relative mx-auto max-w-4xl">
        <h1 id="register-title" className="text-3xl leading-tight font-bold sm:text-5xl">สมัครนักกีฬา</h1>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-lg font-semibold text-blue-200">ACADEMY ลีก 2027</p>
          <a href={import.meta.env.BASE_URL + '#schedule'} className="text-blue-300 underline-offset-4 hover:underline">← กลับไปยังกำหนดการ</a>
        </div>
        <form ref={formRef} className="registration-form mt-7 grid gap-8 border border-[var(--line)] border-t-2 bg-[#10111b] p-5 sm:p-8" noValidate onSubmit={checkRegistration} onChange={updateField}>
          {errorEntries.length > 0 && (
            <section aria-labelledby="registration-errors" className="min-w-0 border border-red-400/40 bg-red-950/20 p-4">
              <h2 id="registration-errors" className="font-bold text-red-200" role="status">กรุณาตรวจ {errorEntries.length} ช่อง</h2>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {errorEntries.map(([name, error]) => (
                  <li key={name}>
                    <a href={'#' + name} className="inline-block py-2 text-red-200 underline underline-offset-4 hover:text-white" onClick={(event) => {
                      event.preventDefault()
                      formRef.current.elements.namedItem(name)?.focus()
                    }}>
                      {error.playerId !== null && playerLabels.get(error.playerId) + ' · '}{error.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <fieldset className="min-w-0">
            <legend className="mb-4 text-xl font-bold">ข้อมูลทีม</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="team-name" label="ชื่อทีม" error={errors['team-name']} />
              <TextField name="team-tag" label="ชื่อย่อทีม" error={errors['team-tag']} />
              <ImageField name="team-logo" label="โลโก้ทีม" recommendedSize="500 x 500 px" error={errors['team-logo']} required />
              <TextField name="phone" label="เบอร์โทรผู้ติดต่อทีม" type="tel" autoComplete="tel" pattern={undefined} hint="ใช้ตัวเลข 9–15 หลัก เว้นวรรคหรือใส่ขีดได้ และขึ้นต้นด้วย + ได้" error={errors.phone} />
            </div>
          </fieldset>

          <section aria-labelledby="players-title" className="grid gap-4">
            <h2 id="players-title" className="text-xl font-bold">รายชื่อผู้เล่นหลัก</h2>
            {players.map((id, index) => (
              <PlayerRow key={id} playerId={id} label={playerLabels.get(id)} errors={errors} collapsed={collapsedPlayers.includes(id)} onToggle={togglePlayer} onRemove={index > 0 ? () => removePlayer(players, setPlayers, index, 'add-player') : undefined} addButton={index === players.length - 1 ? addMainButton : null} />
            ))}
          </section>

          <section aria-labelledby="substitutes-title" className="grid gap-4">
            <h2 id="substitutes-title" className="text-xl font-bold">ตัวสำรอง <span className="text-sm font-normal text-[var(--muted)]">(ไม่บังคับ)</span></h2>
            {substitutes.map((id, index) => (
              <PlayerRow key={id} playerId={id} label={playerLabels.get(id)} errors={errors} collapsed={collapsedPlayers.includes(id)} onToggle={togglePlayer} onRemove={() => removePlayer(substitutes, setSubstitutes, index, 'add-substitute')} addButton={index === substitutes.length - 1 ? addSubstituteButton : null} />
            ))}
            {substitutes.length === 0 && addSubstituteButton}
          </section>

          <div className="grid gap-4 border-t border-[var(--line)] pt-5">
            <div>
              <label className="flex items-start gap-3">
                <input id="pdpa-consent" className="pdpa-input sr-only" type="checkbox" name="pdpa-consent" required onChange={updatePdpaConsent} data-error-label="การยินยอม (PDPA)" data-required-message="กรุณาติ๊กช่องรับทราบและยินยอมก่อนตรวจแบบฟอร์ม" {...errorAttributes('pdpa-consent', errors['pdpa-consent'], 'pdpa-hint')} />
                <span className={'pdpa-indicator mt-1 flex size-5 shrink-0 items-center justify-center ' + (pdpaVisual === 'loading' ? 'pdpa-loading' : pdpaVisual === 'done' ? 'pdpa-done' : '')} aria-hidden="true">
                  {pdpaVisual === 'done' && <Check size={16} strokeWidth={3} />}
                </span>
                <span>รับทราบเงื่อนไขและยินยอมให้ใช้ข้อมูลตัวอย่างเพื่อทดสอบแบบฟอร์ม (PDPA)<RequiredMark /></span>
              </label>
              <p id="pdpa-hint" className="mt-2 text-sm text-[var(--muted)]">ข้อมูลและไฟล์ใช้สำหรับทดลองในหน้านี้เท่านั้น โดยไม่มีการส่งหรือบันทึก</p>
              <FieldError name="pdpa-consent" error={errors['pdpa-consent']} />
            </div>
            <button className="button registration-submit w-full cursor-pointer" type="submit">ส่งแบบฟอร์ม</button>
            <div role="status">
              {checked && (
                <p className="flex items-start gap-2 text-green-300">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  ตรวจแบบฟอร์มผ่านแล้ว ไม่มีการส่งหรือบันทึกข้อมูล
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
