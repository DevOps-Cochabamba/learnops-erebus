import React from 'react'

export default ({ className, children }) => (
  <div className={className}>
    <table>
      <tbody>
        <tr>
          <td>
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)
